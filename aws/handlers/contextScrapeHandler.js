// aws/handlers/contextScrapeHandler.js
const { authMiddleware, corsHeaders } = require('../middleware');
const { scrapingController } = require('../controllers');
const { success } = require('../utils/response');
const { handleError } = require('../utils/errorHandler');

exports.handler = async (event, context) => {
  try {
    if (event.requestContext.http.method === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders(), body: '' };
    }

    const user = await authMiddleware(event);
    const body = JSON.parse(event.body || '{}');
    const { projectId, url } = body;

    if (!projectId || !url) {
      return fail('projectId and url are required', 400);
    }

    const result = await scrapingController.scrapeAndStore(user.sub, projectId, url);

    return { ...success(result), headers: corsHeaders() };
  } catch (err) {
    return { ...handleError(err, context), headers: corsHeaders() };
  }
};
