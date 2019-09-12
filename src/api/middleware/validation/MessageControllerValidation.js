const Joi = require('@hapi/joi')
const utils = require('../../../common/utils')

module.exports = {
    send(req, res, next) {
        const schema = {
            message: Joi.string()
        }

        if (utils.isEmpty(req.body)) {
            res.status(400).send('Parameter body cannot be empty!')
        } else {
            let validate = Joi.validate(req.body, schema)
            if (validate.error == null) {
                next()
            } else {
                res.status(400).send({ error: validate.error.details[0].message })
            }
        }
    }
}
