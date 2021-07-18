const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
const auth = require('../middleware/auth');
const { DoesUserHavePermission } = require('../util/CheckPermission');

router.get('/getQrLinks', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.QRLINK.getAllQrLinks);
        SendResponse(req, res, result, (result && result.length > 0))
    } catch (error) {
        return SendResponse(req, res, `getQrLinks`, false, 500);
    }

});

router.post('/addNewQrLinkInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        console.log('add new qr link', req.body)
        var result = await db.query(queries.QRLINK.addNewQrLinkInfo,
            {
                linkAddress: req.body.linkAddress,
                effectiveDate: req.body.effectiveDate
            });

        let data = result[0]['OutVal'] !== false ?
            "The operation has been done successfully" :
            "Operation failed";

        return SendResponse(req, res, data, result[0]['QrLinkID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `addNewQrLinkInfo`, false, 500);
    }

});

router.put('/updateQrLinkInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.QRLINK.updateQrLinkInfo,
            {
                linkAddress: req.body.linkAddress,
                effectiveDate: req.body.effectiveDate,
                isValid: req.body.isValid,
                id: req.body.id
            });

        let data = result[0]['OutVal'] !== false ?
            "The operation has been done successfully" :
            "Operation failed";

        console.log(result, req.body)
        return SendResponse(req, res, data, result[0]['QrLinkID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `updateQrLinkInfo`, false, 500);
    }

});

router.delete('/deleteQrLinkInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.QRLINK.deleteQrLinkInfo,
            {
                id: req.body.id
            });

        let data = result[0]['OutVal'] !== false ?
            "The operation has been done successfully" :
            "Operation failed";

        console.log(result, req.body)
        return SendResponse(req, res, data, result[0]['QrLinkID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `deleteQrLinkInfo`, false, 500);
    }

});

module.exports = router;