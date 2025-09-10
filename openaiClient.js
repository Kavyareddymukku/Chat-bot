const axios = require('axios');

async function callLLM(apiKey, messages, options = {}) {
  const body = {
    model: options.model || "gpt-4o-mini",
    messages,
    max_tokens: options.max_tokens || 500,
    temperature: options.temperature ?? 0.2
  };

  const res = await axios.post(process.env.OPENAI_API_URL, body, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  return res.data;
}

module.exports = { callLLM };
