const { AppError } = require('../utils/errorHandler');
const { hashApiKey } = require('../utils/apiKeyManager');
const db = require('../services/db');

async function apiKeyAuthMiddleware(event) {
  const apiKey = event.headers?.['x-api-key'];
  if (!apiKey) throw new AppError("Missing API key", 401);

  const hashed = hashApiKey(apiKey);
  const project = await db.getProjectByApiKeyHash(hashed);
  if (!project) throw new AppError("Invalid API key", 401);

  return project;
}

module.exports = { apiKeyAuthMiddleware };
