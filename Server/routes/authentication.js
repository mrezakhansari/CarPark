const express = require('express');
var svgCaptcha = require('svg-captcha');
const router = express.Router();
const md5 = require('md5');
const AES = require('crypto-js/aes');
const { tokenHashKey } = require('../app-setting');
const { SendResponse, GenerateAuthToken } = require('../util/utility')
const CryptoJs = require('crypto-js');
const setting = require('../app-setting')
const sworm = require('sworm');
const queries = require('../util/T-SQL/queries')

const generateCaptcha = () => {
  var captcha = svgCaptcha.create();
  var tempDate = new Date();
  console.log('tempdate', tempDate)
  tempDate.setSeconds(tempDate.getSeconds() + 30);
  console.log('tempdateafter30', tempDate)
  const encodedData = AES.encrypt(
    captcha.text,
    tokenHashKey
  ).toString();
  const timeStamp = AES.encrypt(
    tempDate.valueOf().toString(),
    tokenHashKey
  ).toString();

  const data = {
    encodedData: encodedData,
    timeStamp: timeStamp,
    captchaImage: captcha.data
  }
  return data;
}


router.post('/', async (req, res) => {

  const temp = new Date(Number(AES.decrypt(
    req.body.timeStamp,
    tokenHashKey
  ).toString(CryptoJs.enc.Utf8)))

  console.log('temp.getDay()', temp, (new Date()));


  if (temp < (new Date())) {
    // const data = {
    //   catchaInfo: generateCaptcha(),
    //   errorMessage: "The Security Code is expired"
    // }
    return SendResponse(req, res, "The Security Code is expired", false, 200);
  }

  const decodedData = AES.decrypt(
    req.body.encodedData,
    tokenHashKey
  ).toString(CryptoJs.enc.Utf8);

  if (decodedData.toUpperCase() !== req.body.captchaText.toUpperCase()) {
    // const data = {
    //   catchaInfo: generateCaptcha(),
    //   errorMessage: "The Security Code is expired"
    // }
    return SendResponse(req, res, "The Security Code is invalid", false, 200);
  }

  try {
    const db = sworm.db(setting.db.sqlConfig.CARALDB);
    var user = await db.query(queries.USER.getUserInfoByUserCode,
      {
        userCode: req.body.userCode,
        password: md5(req.body.password)
      });

    console.log('authentication', user,req.body)
    if (user && user.length === 1) {
      const token = GenerateAuthToken(user[0]);
      console.log('token',token); 
      return SendResponse(req, res, { token: token });
    } else
      return SendResponse(req, res, "Incorret Username or Password", false, 200);
  } catch (error) {
    console.log(error)
    return SendResponse(req, res, "Incorret Username or Password", false, 200);
  }

});

module.exports = router;
