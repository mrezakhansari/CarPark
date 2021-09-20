const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
const auth = require('../middleware/auth');
const { DoesUserHavePermission } = require('../util/CheckPermission');
const md5 = require('md5');

router.post('/getUserCarAssignInfoBasedOnQrCode', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.USERCARASSIGN.getUserCarAssignInfoBasedOnQrCode, { id: req.body.id });
        SendResponse(req, res, result, (result && result.length > 0))
    } catch (error) {
        return SendResponse(req, res, `getUserCarAssignInfoBasedOnQrCode`, false, 500);
    }

});

router.get('/getAllUserCarAssignInfo', async (req, res) => {
    try {
        console.log('asdfasdfa');
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.USERCARASSIGN.getAllUserCarAssignInfo);
        SendResponse(req, res, result, (result && result.length > 0))
    } catch (error) {
        return SendResponse(req, res, `getAllUserCarAssignInfo`, false, 500);
    }

});

router.post('/addNewAssignInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.USERCARASSIGN.addNewAssignInfo,
            {
                userId: req.body.userId,
                carId: req.body.carId,
                qrCodeId: req.body.qrCodeId,
                effectiveDate: req.body.effectiveDate,
                plateNo: req.body.plateNo
            });
        console.log('resultttttt', result);
        SendResponse(req, res, result, (result && result.length > 0))
    } catch (error) {
        return SendResponse(req, res, `addNewAssignInfo`, false, 500);
    }

});


router.post('/addNewUserInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.USER.addNewUserInfo,
            {
                name: req.body.name,
                Brand: req.body.brand,
                color: req.body.color,
                password: md5(req.body.password).toUpperCase()
            });

        let data = result[0]['OutVal'] !== false ?
            "The operation has been done successfully" :
            "Operation failed";

        return SendResponse(req, res, data, result[0]['UserID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `addNewUserInfo`, false, 500);
    }

});

module.exports = router;