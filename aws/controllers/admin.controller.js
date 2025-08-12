// aws/controllers/admin.controller.js
const db = require('../services/db');

async function listAllUsers() {
  return await db.listUsers();
}

async function listAllProjects() {
  return await db.listAllProjects();
}

async function updateFeatureFlags(userId, flags) {
  return await db.setUserFeatureFlags(userId, flags);
}

module.exports = {
  listAllUsers,
  listAllProjects,
  updateFeatureFlags,
};
