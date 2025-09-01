// aws/controllers/chat.controller.js
const { AppError } = require('../utils/errorHandler');
const aiService = require('../ai/index.js');

async function sendChatQuery(userId, projectId, queryText) {
  if (!queryText) throw new AppError("Query is required", 400);
  
  // Call AI service pipeline/chat with query
  const response = await aiService.chatPipeline(userId, projectId, queryText);
  return response;
}

async function sendChatStream(userId, projectId, queryText) {
  if (!queryText) throw new AppError("Query is required", 400);

  // Call streaming pipeline
  const stream = await aiService.chatStreamPipeline(userId, projectId, queryText);
  return stream;
}

module.exports = {
  sendChatQuery,
  sendChatStream,
};
