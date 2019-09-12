const customErrors = require('../../common/customError')
const messageService = require('../../services/MessageService')

module.exports = {
    async send(req, res) {
        try {
            let messageDTO = req.body;
            let saveResult = await messageService.saveMessage(messageDTO);
            res.send(saveResult);
        } catch (err) {
            customErrors.mapDomainErrorToHttpResponse(res, err)
        }
    },
    async get(req, res) {
        try {
            const messageId = req.params.messageId;
            const message = await messageService.getMessageById(messageId);
            res.send(message);
        } catch (err) {
            customErrors.mapDomainErrorToHttpResponse(res, err)
        }
    },
    async getAll(req, res) {
        try {
            const allMessages = messageService.getAllMessages();
            res.send(allMessages);
        } catch (err) {
            customErrors.mapDomainErrorToHttpResponse(res, err)
        }
    }
};