// aws/utils/logger.js
const levels = ["info", "warn", "error", "debug"];

function log(level, message, meta = {}, context = {}) {
  if (!levels.includes(level)) level = "info";

  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    requestId: context.awsRequestId || null,
    functionName: context.functionName || null,
    ...meta,
  };

  // CloudWatch-friendly JSON logging
  console.log(JSON.stringify(logEntry));
}

module.exports = {
  info: (msg, meta, ctx) => log("info", msg, meta, ctx),
  warn: (msg, meta, ctx) => log("warn", msg, meta, ctx),
  error: (msg, meta, ctx) => log("error", msg, meta, ctx),
  debug: (msg, meta, ctx) => log("debug", msg, meta, ctx),
};
