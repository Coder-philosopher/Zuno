// aws/controllers/apikeys.controller.js
const { generateApiKey, hashApiKey } = require('../utils/apiKeyManager');
const { AppError } = require('../utils/errorHandler');
const db = require('../services/db');

async function listApiKeys(userId) {
  return await db.getApiKeysByUser(userId);
}

async function createApiKey(userId, projectId) {
  const { rawKey, hash } = generateApiKey();

  const saved = await db.createApiKey({
    userId,
    projectId,
    keyHash: hash,
    createdAt: new Date().toISOString(),
  });

  if (!saved) throw new AppError("Failed to create API key", 500);

  // Return only rawKey once to user (can't retrieve later)
  return { apiKey: rawKey };
}

async function revokeApiKey(keyId, userId) {
  const deleted = await db.deleteApiKey(keyId, userId);
  if (!deleted) throw new AppError("Failed to revoke API key", 500);
  return true;
}

module.exports = {
  listApiKeys,
  createApiKey,
  revokeApiKey,
};
