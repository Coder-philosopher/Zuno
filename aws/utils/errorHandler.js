// aws/utils/errorHandler.js
const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode = 500, meta = {}) {
    super(message);
    this.statusCode = statusCode;
    this.meta = meta;
    Error.captureStackTrace(this, this.constructor);
  }
}

function handleError(err, context) {
  const isCustom = err instanceof AppError;

  // Log full error for debugging
  logger.error(err.message, {
    stack: err.stack,
    meta: err.meta || {},
    statusCode: err.statusCode || 500
  }, context);

  // Return safe API Gateway response
  return {
    statusCode: isCustom ? err.statusCode : 500,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      success: false,
      error: isCustom ? err.message : "Internal Server Error",
    })
  };
}

module.exports = {
  AppError,
  handleError
};
