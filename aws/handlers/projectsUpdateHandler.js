// aws/handlers/projectsUpdateHandler.js
const { authMiddleware, validateMiddleware, corsHeaders } = require('../middleware');
const { projectsController } = require('../controllers');
const { success, fail } = require('../utils/response');
const { handleError } = require('../utils/errorHandler');
const { object, string, boolean } = require('yup');

const updateProjectSchema = object({
  name: string().optional(),
  description: string().optional(),
  theme: string().optional(),
  enabled: boolean().optional(),
  // add other updatable fields
});

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

    const payload = JSON.parse(event.body || '{}');
    const validated = await validateMiddleware(updateProjectSchema, payload);

    const updatedProject = await projectsController.updateProject(user.sub, projectId, validated);

    return { ...success(updatedProject), headers: corsHeaders() };
  } catch (err) {
    if (err.name === 'ValidationError') {
      return fail(err.message, 400, err.errors);
    }
    return { ...handleError(err, context), headers: corsHeaders() };
  }
};
