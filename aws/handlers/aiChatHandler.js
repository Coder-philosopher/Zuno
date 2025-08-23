const { corsHeaders } = require('../middleware/cors.middleware');
const { apiKeyAuthMiddleware } = require('../middleware/apiKeyAuth.middleware');
const { handleError } = require('../utils/errorHandler');
const { success, fail } = require('../utils/response');
const { handleChat } = require('../controllers/chat.controller');

exports.handler = async (event, context) => {
  try {
    if (event.requestContext?.http?.method === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders(), body: '' };
    }

    // API Key auth → returns project with LLM config
    const project = await apiKeyAuthMiddleware(event);

    const body = JSON.parse(event.body || '{}');
    const { query } = body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return { ...fail('Missing or invalid query', 400), headers: corsHeaders() };
    }

    const result = await handleChat({ project, query });

    return {
      ...success({
        answer: result.answer,
        context: result.contextUsed
      }),
      headers: corsHeaders()
    };
  } catch (err) {
    return { ...handleError(err, context), headers: corsHeaders() };
  }
};
