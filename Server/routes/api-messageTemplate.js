const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
const auth = require('../middleware/auth');
const { DoesUserHavePermission } = require('../util/CheckPermission');

router.get('/getMessageTemplates', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.MESSAGETEMPLATE.getAllMessageTemplates);
        SendResponse(req, res, result, (result && result.length > 0))
    } catch (error) {
        return SendResponse(req, res, `getMessageTemplates`, false, 500);
    }

});

router.post('/addNewMessageTemplateInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        console.log('add new message template', req.body)
        var result = await db.query(queries.MESSAGETEMPLATE.addNewMessageTemplateInfo,
            {
                message: req.body.message
            });

        let data = result[0]['OutVal'] !== false ?
            "The operation has been done successfully" :
            "Operation failed";

        return SendResponse(req, res, data, result[0]['MessageTemplateID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `addNewMessageTemplateInfo`, false, 500);
    }

});

router.put('/updateMessageTemplateInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.MESSAGETEMPLATE.updateMessageTemplateInfo,
            {
                message: req.body.message,
                id: req.body.id
            });

        let data = result[0]['OutVal'] !== false ?
            "The operation has been done successfully" :
            "Operation failed";

        console.log('updateMessageTemplateInfo',result, req.body)
        return SendResponse(req, res, data, result[0]['MessageTemplateID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `updateMessageTemplateInfo`, false, 500);
    }

});

router.delete('/deleteMessageTemplateInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.MESSAGETEMPLATE.deleteMessageTemplateInfo,
            {
                id: req.body.id
            });

        let data = result[0]['OutVal'] !== false ?
            "The operation has been done successfully" :
            "Operation failed";

        console.log(result, req.body)
        return SendResponse(req, res, data, result[0]['MessageTemplateID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `deleteMessageTemplateInfo`, false, 500);
    }

});

module.exports = router;