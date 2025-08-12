// aws/controllers/index.js

const aiController = require('./ai.controller');
const authController = require('./auth.controller');
const billingController = require('./billing.controller');
const projectsController = require('./projects.controller');
const scrapingController = require('./scraping.controller');

// Newly added controllers from our plan
const usersController = require('./users.controller');
const apikeysController = require('./apikeys.controller');
const chatController = require('./chat.controller');
const analyticsController = require('./analytics.controller');
const supportController = require('./support.controller');
const adminController = require('./admin.controller');

module.exports = {
  aiController,
  authController,
  billingController,
  projectsController,
  scrapingController,
  usersController,
  apikeysController,
  chatController,
  analyticsController,
  supportController,
  adminController
};
