const neDB = require('nedb');
const config = require('../config/index');
const db = new neDB({ filename: config.dbName, autoload: true });
module.exports = {
    db,
    dbFindOnePromise: (query) => {
        return new Promise(function (resolve, reject) {
            db.findOne(query, function (error, data) {
                error ? reject(error) : resolve(data);
            });
        });
    },
    dbInsertPromise: (newDoc) => {
        return new Promise(function (resolve, reject) {
            db.insert(newDoc, function (error, data) {
                error ? reject(error) : resolve(data);
            });
        });
    }
}