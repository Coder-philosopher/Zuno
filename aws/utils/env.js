// aws/utils/env.js
require('dotenv').config();
const logger = require('./logger');

const requiredVars = [
  "STRIPE_SECRET_KEY",
  "PINECONE_API_KEY",
  "CLERK_SECRET_KEY"
];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    logger.error(`❌ Missing environment variable: ${key}`);
    throw new Error(`Missing env var: ${key}`);
  }
});

module.exports = {
  stripeKey: process.env.STRIPE_SECRET_KEY,
  pineconeKey: process.env.PINECONE_API_KEY,
  clerkKey: process.env.CLERK_SECRET_KEY,
  nodeEnv: process.env.NODE_ENV || "development"
};
