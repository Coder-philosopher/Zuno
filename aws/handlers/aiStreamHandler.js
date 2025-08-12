// aws/handlers/aiStreamHandler.js
const { authMiddleware, corsHeaders } = require('../middleware');
const { aiController } = require('../controllers');
const { handleError } = require('../utils/errorHandler');

exports.handler = async (event, context) => {
  try {
    if (event.requestContext.http.method === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders(), body: '' };
    }

    const user = await authMiddleware(event);

    const body = JSON.parse(event.body || '{}');
    const { projectId, query } = body;

    if (!projectId || !query) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ success: false, error: 'projectId and query are required' }),
      };
    }

    const stream = await aiController.sendChatStream(user.sub, projectId, query);

    // Stream response via API Gateway HTTP API payload format version 2

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
      body: stream, // Return as a readable stream or string of tokens depending on your implementation
      isBase64Encoded: false,
    };
  } catch (err) {
    return { ...handleError(err, context), headers: corsHeaders() };
  }
};
