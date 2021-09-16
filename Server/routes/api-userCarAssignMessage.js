//const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
const auth = require('../middleware/auth');
var Kavenegar = require('kavenegar');

var api = Kavenegar.KavenegarApi({apikey: '63416D79483430636F3154443370535158556E6F4139792B364D6A61695762436E357A557471695874486F3D'});


router.post('/saveMessage', async (req, res) => {
  try {
    const db = sworm.db(setting.db.sqlConfig.CARALDB);
    

    var userInfo = await db.query(queries.USER.getUserInfoById, { id: req.body.toUser_id });
    if (userInfo.length > 0) {
      console.log('add new message template', req.body,userInfo);

      api.VerifyLookup({token: userInfo[0]['LastName'] , receptor: userInfo[0]['MobileNo'],template:`template${req.body.messageTemplate_id}`,type:"sms"},function(er){
          console.log(er)
        })
      // api.Send({ message: req.body.messageText , sender: "1000596446" , receptor: userInfo[0]['MobileNo'] },function(er){
      //   console.log(er)
      // }); 
      var result = await db.query(queries.USERCARASSIGNMESSAGE.saveMessage,
        {
          userCarAssign_id: req.body.userCarAssign_id,
          fromUser_id: req.body.fromUser_id,
          toUser_id: req.body.toUser_id,
          messageTemplate_id: req.body.messageTemplate_id
        });

        return SendResponse(req, res, 'پیغام شما به راننده ارسال گردید', true);
    }
    
    // let resultSendMail = false;
    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'mreza.khansari@gmail.com',
    //     pass: 'mohammad3860119435'
    //   }
    // });

    // var mailOptions = {
    //   from: 'mreza.khansari@gmail.com',
    //   to: 'milad.farhangi@gmail.com',
    //   subject: 'Sending Email using Node.js',
    //   text: req.body.messageText
    // };

    // await transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //     let data = result[0]['OutVal'] !== false ?
    //       "The operation has been done successfully" :
    //       "Operation failed";

    //     return SendResponse(req, res, data, false);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //     resultSendMail = true;
    //     let data = result[0]['OutVal'] !== false && resultSendMail ?
    //       "The operation has been done successfully" :
    //       "Operation failed";

    //     console.log(result[0]['OutVal'], resultSendMail)
    //     return SendResponse(req, res, data, true);
    //   }
    // });

  } catch (error) {
    console.log(error)
    return SendResponse(req, res, `addNewMessageTemplateInfo`, false, 500);
  }

});

module.exports = router;