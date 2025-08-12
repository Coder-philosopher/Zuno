// aws/handlers/projectsPostHandler.js
const { authMiddleware, validateMiddleware, corsHeaders } = require('../middleware');
const { projectsController } = require('../controllers');
const { success, fail } = require('../utils/response');
const { handleError } = require('../utils/errorHandler');
const { object, string } = require('yup');

const createProjectSchema = object({
  name: string().required(),
  description: string().optional(),
  // add more project fields/schema as needed
});

exports.handler = async (event, context) => {
  try {
    if (event.requestContext.http.method === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders(), body: '' };
    }

    const user = await authMiddleware(event);

    const payload = JSON.parse(event.body || '{}');
    const validated = await validateMiddleware(createProjectSchema, payload);

    const newProject = await projectsController.createProject(user.sub, validated);

    return { ...success(newProject, 201), headers: corsHeaders() };
  } catch (err) {
    if (err.name === 'ValidationError') {
      return fail(err.message, 400, err.errors);
    }
    return { ...handleError(err, context), headers: corsHeaders() };
  }
};
