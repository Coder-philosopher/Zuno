// aws/controllers/billing.controller.js
const fetch = require('node-fetch');
const { AppError } = require('../utils/errorHandler');
const { stripeKey } = require('../utils/env'); // (replace if using Polar secrets)
const POLAR_API_BASE = 'https://api.polar.sh/v1';

// Polar Auth token should be added to env vars
const POLAR_API_KEY = process.env.POLAR_API_KEY;

if (!POLAR_API_KEY) {
  throw new Error("Missing POLAR_API_KEY in environment variables");
}

// Example: Create a Checkout Session
async function createCheckoutSession(userId, planId) {
  const response = await fetch(`${POLAR_API_BASE}/checkout_sessions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${POLAR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customer: userId,  // your user identifier in Polar
      plan: planId,
      success_url: 'https://yourfrontend.com/success',
      cancel_url: 'https://yourfrontend.com/cancel'
    })
  });

  if (!response.ok) {
    const errStr = await response.text();
    throw new AppError(`Polar Checkout Session creation failed: ${errStr}`, 500);
  }

  const data = await response.json();
  return data;  // Contains session URL or ID to send back to frontend
}

// Other billing-related functions: webhook handling, subscription status, etc.

module.exports = {
  createCheckoutSession,
};
