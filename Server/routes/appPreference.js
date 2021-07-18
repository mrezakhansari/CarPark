const express = require('express');
const router = express.Router();
const { SendResponse } = require('../util/utility')
const queries = require('../util/T-SQL/queries')
const setting = require('../app-setting')
const sworm = require('sworm');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
    try {
        // console.log(req.body);
        const db = sworm.db(setting.db.sqlConfig[`${req.user.area}`]);
        var result = await db.query(queries.APPPREFERENCE.getSetting);
        SendResponse(req, res, result, (result && result.length > 0))
    } catch (error) {
        return SendResponse(req, res, 'getSetting', false, 500);
    }
})


module.exports = router;