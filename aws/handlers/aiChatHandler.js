// aws/handlers/aiChatHandler.js
const { authMiddleware, corsHeaders } = require('../middleware');
const { aiController } = require('../controllers');
const { success } = require('../utils/response');
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
      return fail('projectId and query are required', 400);
    }

    const response = await aiController.sendChatQuery(user.sub, projectId, query);

    return { ...success(response), headers: corsHeaders() };
  } catch (err) {
    return { ...handleError(err, context), headers: corsHeaders() };
  }
};
