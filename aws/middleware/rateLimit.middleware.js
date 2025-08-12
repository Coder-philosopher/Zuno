// aws/middleware/rateLimit.middleware.js
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// This is in-memory and will reset when Lambda cold starts —
// For production, use Redis/DynamoDB
const rateStore = {};

function rateLimitMiddleware(event, limit = 100, windowMs = 60000) {
  const ip = event.requestContext?.http?.sourceIp || 'unknown';

  if (!rateStore[ip]) {
    rateStore[ip] = { count: 1, startTime: Date.now() };
  } else {
    const elapsed = Date.now() - rateStore[ip].startTime;

    if (elapsed < windowMs) {
      rateStore[ip].count++;
      if (rateStore[ip].count > limit) {
        logger.warn(`Rate limit exceeded by IP ${ip}`);
        throw new AppError("Too Many Requests", 429);
      }
    } else {
      rateStore[ip] = { count: 1, startTime: Date.now() };
    }
  }
}

module.exports = { rateLimitMiddleware };
