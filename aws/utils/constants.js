// aws/utils/constants.js
module.exports = {
  PLAN_LIMITS: {
    free: { maxProjects: 1, maxMessages: 1000 },
    pro: { maxProjects: 10, maxMessages: 10000 },
    enterprise: { maxProjects: 100, maxMessages: 100000 }
  },
  SUPPORTED_LANGUAGES: ["en", "es", "fr", "de"],
  DEFAULT_TIMEZONE: "UTC"
};
