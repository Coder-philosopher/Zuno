// aws/utils/validator.js
const { object, string } = require('yup');
const { AppError } = require('./errorHandler');

async function validate(schema, payload) {
  try {
    return await schema.validate(payload, { abortEarly: false, stripUnknown: true });
  } catch (err) {
    throw new AppError("Validation Failed", 400, { errors: err.errors });
  }
}

module.exports = { validate, object, string };
