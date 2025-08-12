// aws/controllers/users.controller.js
const { AppError } = require('../utils/errorHandler');
const db = require('../services/db'); // Your DB query module here
const clerkClient = require('@clerk/clerk-sdk-node'); // Clerk SDK

// Fetch user details by userId (Clerk user id)
async function getUserById(userId) {
  const userRecord = await db.getUser(userId);
  if (!userRecord) {
    // Optionally, fetch from Clerk if not found locally and create local record
    const clerkUser = await clerkClient.users.getUser(userId);
    if (!clerkUser) throw new AppError('User not found', 404);

    const newUser = {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      plan: 'free', // default plan
      createdAt: new Date().toISOString(),
      // any other metadata
    };

    await db.createUser(newUser);
    return newUser;
  }
  return userRecord;
}

// Update user plan and metadata in DB (called from Clerk webhook handler usually)
async function updateUserPlan(userId, plan) {
  const updated = await db.updateUser(userId, { plan });
  if (!updated) throw new AppError("Failed to update user plan", 500);
  return updated;
}

// List all users (for admin)
async function listUsers() {
  return await db.listUsers();
}

module.exports = {
  getUserById,
  updateUserPlan,
  listUsers,
};
