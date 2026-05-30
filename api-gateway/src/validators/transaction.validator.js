const Joi = require("joi");

const transactionSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .required(),

  stationId: Joi.string()
    .required(),
});

module.exports = {
  transactionSchema,
};