const joi = require('joi');

const buyCoin = {
    query: joi.object().keys({
        exchange: joi.string().required()
    }),
    params: joi.object().keys({}),
    body: joi.object().keys({
        coinName: joi.string().required(),
        paymentAmount: joi.number().required()
    })
}

module.exports = {
    buyCoin
}