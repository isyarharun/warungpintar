const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    environment : process.env.ENVIRONMENT,
    testHost: process.env.TEST_HOST,
    dbName: process.env.DB_NAME
    // put other setting in here, it clean using this way rather tahn using process.env in code
}