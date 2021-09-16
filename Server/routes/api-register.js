const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({apikey: '63416D79483430636F3154443370535158556E6F4139792B364D6A61695762436E357A557471695874486F3D'});

router.route('/').post(async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.DRIVER.registerDriver,
            {
                mobileNo: req.body.mobileNo
            });

            //let date=(new Date()).toDateString().replace(' ','-');
            api.VerifyLookup({token: (new Date()).getHours() , receptor: '09903838648',template:`template3`,type:"sms"},function(er){
                console.log(er)
              })
            let data = result[0]['OutVal'] !== false ?
                "اطلاعات شما در سامانه ثبت شد\n همکاران ما با شما تماس خواهند گرفت." :
                "خطا در ثبت اطلاعات";

            return SendResponse(req, res, data, result[0]['UserID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `registerDriver`, false, 500);
    }

});

router.route('/checkUserExistsAlready').post(async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.DRIVER.checkUserExistsAlready,
            {
                mobileNo: req.body.mobileNo
            });

            let data = result[0]['OutVal'] == true ?
                "اطلاعات شما قبلا در سامانه ثبت شده\n لطفا با واحد پشتیبانی تماس بگیرید." :
                "";

            return SendResponse(req, res, data, !(result[0]['OutVal'] == true));
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `checkUserExistsAlready`, false, 500);
    }

});

module.exports = router;