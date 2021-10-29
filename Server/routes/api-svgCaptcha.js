var svgCaptcha = require('svg-captcha');
const express = require('express');
const router = express.Router();
const { tokenHashKey } = require('../app-setting');
const AES = require('crypto-js/aes');
const { SendResponse } = require('../util/utility');

router.route('/')
    .get((req, res) => {
        try {
            var captcha = svgCaptcha.create();
            var tempDate=new Date();
            //console.log('tempdate',tempDate)
            tempDate.setSeconds(tempDate.getSeconds() + 30);
            //console.log('tempdateafter30',tempDate)
            const encodedData = AES.encrypt(
                captcha.text,
                tokenHashKey
            ).toString();
            const timeStamp = AES.encrypt(
                //Date.now().valueOf().toString(),
                tempDate.valueOf().toString(),
                tokenHashKey
            ).toString();


            const data = {
                encodedData: encodedData,
                timeStamp: timeStamp,
                captchaImage: captcha.data
            }
           // console.log(data,'asdf')
            //res.type('svg');
            //res.status(200).send(captcha.data);
            return SendResponse(req, res, data, true, 200);
        } catch (error) {
            //console.log('svgsvgsvg', error)
            return SendResponse(req, res, 'getCaptcha', false, 500);
        }

    })

module.exports = router;