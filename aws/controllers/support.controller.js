// aws/controllers/support.controller.js
const db = require('../services/db');
const { AppError } = require('../utils/errorHandler');

async function createSupportTicket(userId, subject, description) {
  if (!subject || !description) throw new AppError("Subject and description required", 400);
  
  const ticket = {
    userId,
    subject,
    description,
    status: 'open',
    createdAt: new Date().toISOString(),
  };

  return await db.insertTicket(ticket);
}

async function listUserTickets(userId) {
  return await db.getTicketsByUser(userId);
}

module.exports = {
  createSupportTicket,
  listUserTickets
};
