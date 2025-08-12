// aws/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');
const { clerkKey } = require('../utils/env');

// This middleware verifies the Clerk-provided JWT and returns the user object
async function authMiddleware(event) {
  const authHeader = event.headers?.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new AppError("Unauthorized - No token provided", 401);
  }

  try {
    // Clerk tokens are usually RS256; replace with Clerk verification if needed
    const decoded = jwt.verify(token, clerkKey);
    return decoded; // contains { sub: userId, email, ... }
  } catch (err) {
    throw new AppError("Unauthorized - Invalid token", 401, { error: err.message });
  }
}

module.exports = { authMiddleware };
