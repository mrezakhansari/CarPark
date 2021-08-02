const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');

router.route('/').post(async (req, res) => {
    try {
        const db = sworm.db(setting.db.sqlConfig.CARALDB);
        var result = await db.query(queries.DRIVER.registerDriver,
            {
                mobileNo: req.body.mobileNo
            });

            let data = result[0]['OutVal'] !== false ?
                "The operation has been done successfully" :
                "Operation failed";

            return SendResponse(req, res, data, result[0]['UserID'] !== false);
    } catch (error) {
        console.log(error)
        return SendResponse(req, res, `registerDriver`, false, 500);
    }

});

module.exports = router;