const { tokenHashKey, jwtSecret, requiresAuth } = require('../app-setting')
const jwt = require('jsonwebtoken');
const AES = require('crypto-js/aes');
const { SendResponse } = require('../util/utility')
const CryptoJs = require('crypto-js');
const setting = require('../app-setting')
const sworm = require('sworm');
const queries = require('../util/T-SQL/queries')


module.exports = async (req, res, next) => {
    if (!requiresAuth) return next();
    const encryptedToken = req.headers['x-auth-token'];
    console.log('auth', req.body);
    if (!encryptedToken) return SendResponse(req, res, "Access denied, corrupted data", false, 403);
    try {
        let token = AES.decrypt(encryptedToken, tokenHashKey).toString(CryptoJs.enc.Utf8)

        jwt.verify(token, jwtSecret, async (error, decoded) => {
            if (error) {
                console.log('from Auth middleWare', error)
                if (error.name == 'TokenExpiredError')
                    return SendResponse(req, res, "Your credential is expired, Please login again", false, 403);
                else
                    return SendResponse(req, res, "Access to the part has been forbidden", false, 403);
            }
            else {
                console.log('auth decode', decoded);
                const db = sworm.db(setting.db.sqlConfig.CARALDB);
                var user = await db.query(queries.USER.getUserInfoById,
                    {
                        id: decoded.id
                    });

                if (!user || user.length < 1) {
                    return SendResponse(req, res, "Incorret Username or Password", false, 200);
                }
                req.user = user[0];
                next();
            }
        })
}
    catch (ex) {
    return SendResponse(req, res, "Access denied, corrupted data", false, 403)
}
}