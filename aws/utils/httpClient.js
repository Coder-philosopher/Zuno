// aws/utils/httpClient.js
const fetch = require("node-fetch");
const logger = require("./logger");

async function httpRequest(url, options = {}, retries = 2) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    return res.json();
  } catch (err) {
    logger.error(`HTTP request failed: ${err.message}`, { url, options });
    if (retries > 0) {
      logger.warn(`Retrying request... (${retries} retries left)`);
      return httpRequest(url, options, retries - 1);
    }
    throw err;
  }
}

module.exports = { httpRequest };
