// aws/middleware/index.js

// Import all middlewares
const { authMiddleware } = require('./auth.middleware');
const { validateMiddleware } = require('./validate.middleware');
const { planMiddleware } = require('./plan.middleware');
const { apiKeyAuthMiddleware } = require('./apiKeyAuth.middleware');
const { rateLimitMiddleware } = require('./rateLimit.middleware');
const { corsHeaders, corsResponse } = require('./cors.middleware');

// Export them together
module.exports = {
  authMiddleware,
  validateMiddleware,
  planMiddleware,
  apiKeyAuthMiddleware,
  rateLimitMiddleware,
  corsHeaders,
  corsResponse
};
