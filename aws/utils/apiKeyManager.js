// aws/utils/apiKeyManager.js
const crypto = require('crypto');

// Generates a raw key + its hash for secure storage.
function generateApiKey() {
  const rawKey = crypto.randomBytes(32).toString('hex'); // 64-char key
  const hash = hashApiKey(rawKey);
  return { rawKey, hash };
}

// Hash API key for DB storage
function hashApiKey(apiKey) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

// Validate provided API key with stored hash
function validateApiKey(providedKey, storedHash) {
  const providedHash = hashApiKey(providedKey);
  return crypto.timingSafeEqual(
    Buffer.from(providedHash),
    Buffer.from(storedHash)
  );
}

// Rotate API key (generate new one)
function rotateApiKey() {
  return generateApiKey();
}

module.exports = {
  generateApiKey,
  hashApiKey,
  validateApiKey,
  rotateApiKey
};
