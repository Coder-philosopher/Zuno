// aws/middleware/validate.middleware.js
const { AppError } = require('../utils/errorHandler');

async function validateMiddleware(schema, payload) {
  try {
    const validated = await schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true
    });
    return validated;
  } catch (err) {
    throw new AppError("Validation Error", 400, { errors: err.errors });
  }
}

module.exports = { validateMiddleware };
