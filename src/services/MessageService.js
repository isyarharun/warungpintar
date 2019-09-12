const dbHelper = require('../models/index')
module.exports = {
    saveMessage(message) {
        // add further validation in here

        // save
        return dbHelper.dbInsertPromise(message)
    },
    getMessageById(id) {
        return dbHelper.dbFindOnePromise({ _id: id });
    },
    getAllMessages() {
        // since this one is using a simple database then get all data
        return dbHelper.db.getAllData();
    }
};