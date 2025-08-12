// aws/controllers/analytics.controller.js
const db = require('../services/db');

async function getProjectAnalytics(projectId) {
  return await db.fetchAnalyticsByProject(projectId);
}

async function storeFeedback(projectId, userId, feedback) {
  return await db.saveUserFeedback({ projectId, userId, ...feedback, createdAt: new Date().toISOString() });
}

module.exports = {
  getProjectAnalytics,
  storeFeedback,
};
