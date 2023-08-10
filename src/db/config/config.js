require('dotenv').config();
module.exports = {
    development: {
        username: process.env.DEV_MYSQLUSER,
        password: process.env.DEV_MYSQLPASSWORD,
        database: process.env.DEV_MYSQLDATABASE,
        host: process.env.DEV_MYSQLHOST,
        port: process.env.DEV_MYSQLPORT,
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true
        }
    },
    test: {
        username: process.env.TEST_MYSQLUSER,
        password: process.env.TEST_MYSQLPASSWORD,
        database: process.env.TEST_MYSQLDATABASE,
        host: process.env.TEST_MYSQLHOST,
        port: process.env.TEST_MYSQLPORT,
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true
        }
    },
    production: {
        username: process.env.PROD_MYSQLUSER,
        password: process.env.PROD_MYSQLPASSWORD,
        database: process.env.PROD_MYSQLDATABASE,
        host: process.env.PROD_MYSQLHOST,
        port: process.env.PROD_MYSQLPORT,
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true
        }
    }
}