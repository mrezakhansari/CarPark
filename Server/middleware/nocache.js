const { requiresAuth } = require('../app-setting')
const { SendResponse } = require('../util/utility')

module.exports = function (req, res, next) {

    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    res.setHeader("Expires", date.toUTCString());
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Cache-Control", "public, no-cache");
    
   next();
};
