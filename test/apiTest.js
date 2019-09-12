const expect = require('chai').expect
const axios = require('axios')
const config = require('../src/config/index')
const fs = require('fs');
const BASE_URL = config.testHost || 'http://localhost:4000'

if (config.environment == 'local') {
    describe('API test', function () {
        let testId = "";
        before(function () {
            // delete db file before test
            fs.unlinkSync('warungpintar');
        })

        after(function () {
            // delete db file after test
            fs.unlinkSync('warungpintar');
        })

        it('should ok when send message', async function () {
            let message = {
                message: "test"
            }
            const resp = await axios.post(BASE_URL + '/message/send', message)
            expect(resp.status).to.eql(200)
            testId = resp.data._id
        })

        it('should ok when read message by id', async function () {
            const resp = await axios.get(BASE_URL + `/message/get/${testId}`)
            expect(resp.status).to.eql(200)
            expect(resp.data._id).to.eql(testId)
        })

        it('should ok when read all messages', async function () {
            const resp = await axios.get(BASE_URL + `/message/all`)
            expect(resp.status).to.eql(200)
            expect(resp.data).to.be.an('array')
        })
    })
}