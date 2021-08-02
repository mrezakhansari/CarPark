module.exports = {
    portNo: 4300,
    db: {
        mongo: {
            main: {
                name: 'CaralDB',
                address: 'localhost:27017'
            },
            log: {
                name: 'CaralDB-log',
                address: 'localhost:27017'
            }
        },
        sqlConfig: {
            CARALDB: {
                driver: 'mssql',
                config: {
                    user: 'sa',
                    password: 'qwe123!@#',
                    server: 'localhost',
                    database: 'Caral',
                    pool: {
                        max: 10,
                        min: 0,
                        idleTimeoutMillis: 60000
                    },
                    stream:true,
                    options: {

                       // encrypt: true,
                        enableArithAbort: true
                    }
                }
            }
        }
    },
    jwtExpireTime: "900s", // 15 min
    tokenHashKey: '8c10%$#f9be0b053082',
    requiresAuth: true,
    jwtSecret: "9057c4f0-b57e-4320-9a7e-c028bc3e54cb"
}
