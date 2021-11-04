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
var Kavenegar = require('kavenegar');
const moment = require('moment');

var api = Kavenegar.KavenegarApi({ apikey: '63416D79483430636F3154443370535158556E6F4139792B364D6A61695762436E357A557471695874486F3D' });

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
        password: md5(req.body.password).toUpperCase()
      });

    console.log('authentication', user, req.body)
    if (user && user.length === 1) {
      const token = GenerateAuthToken(user[0]);
      console.log('token', token);
      return SendResponse(req, res, { token: token });
    } else
      return SendResponse(req, res, "Incorret Username or Password", false, 200);
  } catch (error) {
    console.log(error)
    return SendResponse(req, res, "Incorret Username or Password", false, 200);
  }

});


router.post('/SendVerificationCode', async (req, res) => {

  //#region Check Captcha ---------------------------------------------------
  // const temp = new Date(Number(AES.decrypt(
  //   req.body.timeStamp,
  //   tokenHashKey
  // ).toString(CryptoJs.enc.Utf8)))

  // console.log('temp.getDay()', temp, (new Date()));


  // if (temp < (new Date())) {
  //   // const data = {
  //   //   catchaInfo: generateCaptcha(),
  //   //   errorMessage: "The Security Code is expired"
  //   // }
  //   return SendResponse(req, res, "The Security Code is expired", false, 200);
  // }

  // const decodedData = AES.decrypt(
  //   req.body.encodedData,
  //   tokenHashKey
  // ).toString(CryptoJs.enc.Utf8);

  // if (decodedData.toUpperCase() !== req.body.captchaText.toUpperCase()) {
  //   // const data = {
  //   //   catchaInfo: generateCaptcha(),
  //   //   errorMessage: "The Security Code is expired"
  //   // }
  //   return SendResponse(req, res, "The Security Code is invalid", false, 200);
  // }
  //#endregion ------------------------------------------------------------------------------

  try {
    const db = sworm.db(setting.db.sqlConfig.CARALDB);
    var user = await db.query(queries.USER.getUserInfoByPhoneNo,
      {
        userCode: req.body.mobileNo
      });

    console.log('authentication', user, req.body)
    if (user && user.length === 1) {
      const password = Math.random().toString(36).slice(-8);
      try {
        console.log("asdfasdfasdfasdf", password,user);
        var result = await db.query(queries.USER.updateUserPasswordInfo,
          {
            id: user[0].ID,
            password: md5(password).toUpperCase(),
            passwordEffectiveDate: moment().toDate()
          });

        let data = result[0]['OutVal'] !== false ?
          "The operation has been done successfully" :
          "Operation failed";
        console.log(data);
        if (result[0]['OutVal'] !== false) {

          api.VerifyLookup({ token: password, receptor: user[0].MobileNo, template: `template7`, type: "sms" },
            function (response, status) {
              console.log('status code ', status,response);
              if (status !== 200) {
                return SendResponse(req, res, 'خطا در  سامانه مجدد تلاش کنبد', false);
              }
              else {
                return SendResponse(req, res, 'کد تایید ارسال شد', true, 200);
              }
              console.log(er)
            })
        }
        else {
          return SendResponse(req, res, data, result[0]['OutVal'] !== false);
        }
      } catch (error) {
        console.log(error)
        return SendResponse(req, res, `addNewUserInfoFull`, false, 500);
      }
    }
    else {
      return SendResponse(req, res, "نام کاربری اشتباه است", false, 200);
    }
  } catch (error) {
    //console.log(error)
    return SendResponse(req, res, "نام کاربری اشتباه است", false, 200);
  }

});

router.post('/VerifyCode', async (req, res) => {
console.log(req.body)
  try {
    const db = sworm.db(setting.db.sqlConfig.CARALDB);
    var user = await db.query(queries.USER.getUserInfoByUserCode,
      {
        userCode: req.body.mobileNo,
        password: md5(req.body.code)
      });

    console.log('authentication', user, req.body)
    if (user && user.length === 1) {
      const token = GenerateAuthToken(user[0]);
      console.log('token', token);
      return SendResponse(req, res, { token: token }, true, 200);
    } else
      return SendResponse(req, res, "کد تایید وارد شده صحیح نمی باشد", false, 200);
  } catch (error) {
    console.log(error)
    return SendResponse(req, res, "کد تایید وارد شده صحیح نمی باشد", false, 200);
  }

});

module.exports = router;
