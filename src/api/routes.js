const MessageController = require('./controllers/MessageController')
const MessageControllerValidation = require('./middleware/validation/MessageControllerValidation')

module.exports = (app) => {
  app.post('/message/send', MessageControllerValidation.send, MessageController.send)
  app.get('/message/get/:messageId', MessageController.get)
  app.get('/message/all', MessageController.getAll)
}
