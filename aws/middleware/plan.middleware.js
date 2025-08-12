// aws/middleware/plan.middleware.js
const { AppError } = require('../utils/errorHandler');
const { PLAN_LIMITS } = require('../utils/constants');

/**
 * Middleware to check plan restrictions
 * @param {Object} user - { plan: 'free' | 'pro' | 'enterprise', usage: {...} }
 * @param {string} resourceType - 'projects' | 'messages' etc.
 */
function planMiddleware(user, resourceType, currentUsage) {
  const planConfig = PLAN_LIMITS[user.plan];

  if (!planConfig) {
    throw new AppError("Unknown subscription plan", 400);
  }

  if (currentUsage >= planConfig[`max${capitalize(resourceType)}`]) {
    throw new AppError(`Plan limit exceeded for ${resourceType}`, 403);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { planMiddleware };
