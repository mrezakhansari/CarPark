const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
const auth = require('../middleware/auth');
const { DoesUserHavePermission } = require('../util/CheckPermission');

router.get('/getAllCars', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.CAR.getAllCars);
        SendResponse(req, res, result, (result && result.length > 0))
    } catch (error) {
        return SendResponse(req, res, `getAllCars`, false, 500);
    }

});

router.post('/addNewCarInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.CAR.addNewCarInfo,
            {
                name: req.body.name,
                Brand: req.body.brand,
                color: req.body.color
            });

            let data = result[0]['OutVal'] !== false ?
                "The operation has been done successfully" :
                "Operation failed";

            return SendResponse(req, res, data, result[0]['CarID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `addNewCarInfo`, false, 500);
    }

});

router.put('/updateCarInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.CAR.updateCarInfo,
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
            return SendResponse(req, res, data, result[0]['CarID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `updateCarInfo`, false, 500);
    }

});

router.delete('/deleteCarInfo', async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.CAR.deleteCarInfo,
            {
                id:req.body.id
            });

            let data = result[0]['OutVal'] !== false ?
                "The operation has been done successfully" :
                "Operation failed";

                console.log(result,req.body)
            return SendResponse(req, res, data, result[0]['CarID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `deleteCarInfo`, false, 500);
    }

});

module.exports = router;