// aws/handlers/projectsDetailHandler.js
const { authMiddleware, corsHeaders } = require('../middleware');
const { projectsController } = require('../controllers');
const { success, fail } = require('../utils/response');
const { handleError } = require('../utils/errorHandler');

exports.handler = async (event, context) => {
  try {
    if (event.requestContext.http.method === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders(), body: '' };
    }

    const user = await authMiddleware(event);
    const projectId = event.pathParameters?.projectId;

    if (!projectId) {
      return fail('projectId path parameter is required', 400);
    }

    const project = await projectsController.getProjectById(user.sub, projectId);
    if (!project) {
      return fail('Project not found', 404);
    }

    return { ...success(project), headers: corsHeaders() };
  } catch (err) {
    return { ...handleError(err, context), headers: corsHeaders() };
  }
};
