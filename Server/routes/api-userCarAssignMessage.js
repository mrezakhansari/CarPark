const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
const auth = require('../middleware/auth');


router.post('/saveMessage', async (req, res) => {
  try {
    const db = sworm.db(setting.db.sqlConfig.CARALDB);
    console.log('add new message template', req.body)
    var result = await db.query(queries.USERCARASSIGNMESSAGE.saveMessage,
      {
        userCarAssign_id: req.body.userCarAssign_id,
        fromUser_id: req.body.fromUser_id,
        toUser_id: req.body.toUser_id,
        messageTemplate_id: req.body.messageTemplate_id
      });
    let resultSendMail = false;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mreza.khansari@gmail.com',
        pass: 'mohammad3860119435'
      }
    });

    var mailOptions = {
      from: 'mreza.khansari@gmail.com',
      to: 'milad.farhangi@gmail.com',
      subject: 'Sending Email using Node.js',
      text: req.body.messageText
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        let data = result[0]['OutVal'] !== false ?
          "The operation has been done successfully" :
          "Operation failed";

        return SendResponse(req, res, data, false);
      } else {
        console.log('Email sent: ' + info.response);
        resultSendMail = true;
        let data = result[0]['OutVal'] !== false && resultSendMail ?
          "The operation has been done successfully" :
          "Operation failed";

        console.log(result[0]['OutVal'], resultSendMail)
        return SendResponse(req, res, data, true);
      }
    });

  } catch (error) {
    console.log(error)
    return SendResponse(req, res, `addNewMessageTemplateInfo`, false, 500);
  }

});

module.exports = router;