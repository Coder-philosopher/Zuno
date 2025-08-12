// aws/handlers/projectsGetHandler.js
const { authMiddleware, corsHeaders } = require('../middleware');
const { projectsController } = require('../controllers');
const { success } = require('../utils/response');
const { handleError } = require('../utils/errorHandler');

exports.handler = async (event, context) => {
  try {
    if (event.requestContext.http.method === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders(), body: '' };
    }

    const user = await authMiddleware(event);

    const projects = await projectsController.getProjects(user.sub);

    return { ...success(projects), headers: corsHeaders() };
  } catch (err) {
    return { ...handleError(err, context), headers: corsHeaders() };
  }
};
