// aws/middleware/apiKeyAuth.middleware.js
const { AppError } = require('../utils/errorHandler');
const { validateApiKey } = require('../utils/apiKeyManager');
const db = require('../services/db'); // You’d implement a DB query here

async function apiKeyAuthMiddleware(event) {
  const apiKey = event.headers['x-api-key'];

  if (!apiKey) {
    throw new AppError("Missing API key", 401);
  }

  // Fetch project by API key hash
  const stored = await db.getProjectByApiKeyHash(validateApiKey.hashApiKey(apiKey)); 
  if (!stored) {
    throw new AppError("Invalid API key", 401);
  }

  return stored; // Return project info for further processing
}

module.exports = { apiKeyAuthMiddleware };
