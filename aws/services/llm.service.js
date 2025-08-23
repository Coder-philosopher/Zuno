// aws/services/llm.service.js
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
// llm.service.js
const fetch = global.fetch;

/**
 * Call Google Gemini with default API key from env
 */
async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new AppError("Gemini API key not configured", 500);

  const startTime = Date.now();
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  if (!res.ok) {
    const errorMsg = await res.text();
    throw new AppError(`Gemini API error: ${errorMsg}`, res.status);
  }

  const data = await res.json();
  const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  logger.info("Gemini response latency", { ms: Date.now() - startTime });

  return answer;
}

/**
 * Call OpenAI-like APIs (for developer's custom model/api key)
 */
async function callCustomLLM(apiKey, model, prompt) {
  if (!apiKey || !model) {
    throw new AppError("Custom model or API key missing", 400);
  }

  const startTime = Date.now();
  const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 512
    })
  });

  if (!res.ok) {
    const errorMsg = await res.text();
    throw new AppError(`Custom LLM API error: ${errorMsg}`, res.status);
  }

  const data = await res.json();
  const answer = data.choices?.[0]?.message?.content || "";

  logger.info(`Custom LLM (${model}) response latency`, {
    ms: Date.now() - startTime
  });

  return answer;
}

/**
 * Generate an answer with failover to Gemini
 */
async function generateAnswer({ prompt, userApiKey, model }) {
  try {
    if (userApiKey && model) {
      // Developer's custom LLM first
      return await callCustomLLM(userApiKey, model, prompt);
    } else {
      // Default Gemini
      return await callGemini(prompt);
    }
  } catch (err) {
    logger.error(`Primary LLM call failed: ${err.message}`, { stack: err.stack });
    // Failover to Gemini
    try {
      return await callGemini(prompt);
    } catch (gemErr) {
      logger.error(`Gemini failover also failed: ${gemErr.message}`, { stack: gemErr.stack });
      throw new AppError("All LLM calls failed", 500);
    }
  }
}

module.exports = {
  generateAnswer
};
