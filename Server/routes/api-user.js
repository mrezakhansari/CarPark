const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
const auth = require('../middleware/auth');
const { DoesUserHavePermission } = require('../util/CheckPermission');
const md5 = require('md5');


router.get('/getUserTypes', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.USER.getUserTypes);
        console.log("ressfasfasdfasdf",result);
        SendResponse(req, res, result, (result && result.length > 0))
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `getUserTypes`, false, 500);
    }

});

router.get('/getAllUsers', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.USER.getAllUsers);
        console.log("ressfasfasdfasdf",result);
        SendResponse(req, res, result, (result && result.length > 0))
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `getAllUsers`, false, 500);
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
                password : md5(req.body.password).toUpperCase()
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

router.put('/updateUserInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.USER.updateUserInfo,
            {
                name: req.body.name,
                Brand: req.body.brand,
                color: req.body.color,
                id:req.body.id
            });

            let data = result[0]['OutVal'] !== false ?
                "The operation has been done successfully" :
                "Operation failed";

                console.log(result,req.body)
            return SendResponse(req, res, data, result[0]['UserID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `updateUserInfo`, false, 500);
    }

});

router.delete('/deleteUserInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.USER.deleteUserInfo,
            {
                id:req.body.id
            });

            let data = result[0]['OutVal'] !== false ?
                "The operation has been done successfully" :
                "Operation failed";

                console.log(result,req.body)
            return SendResponse(req, res, data, result[0]['UserID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `deleteUserInfo`, false, 500);
    }

});

module.exports = router;