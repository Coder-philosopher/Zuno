// aws/utils/response.js

function success(data = {}, statusCode = 200, meta = {}) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      success: true,
      data,
      meta
    })
  };
}

function fail(message = "Bad Request", statusCode = 400, errors = []) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      success: false,
      error: message,
      errors
    })
  };
}

module.exports = { success, fail };
