const { Pinecone } = require('@pinecone-database/pinecone');
const { AppError } = require('../utils/errorHandler');

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});
const index = pc.index(process.env.PINECONE_INDEX_NAME);

async function generateEmbedding(text) {
  if (!text || !text.trim()) {
    throw new AppError("Cannot embed empty text", 400);
  }
  const embedResponse = await pc.inference.embed({
    model: "llama-text-embed-v2",
    input: text
  });
  const vector = embedResponse.data?.[0]?.values;
  if (!vector) throw new AppError("Embedding failed", 500);
  return vector;
}

async function queryContext(namespace, query, topK = 2) {
  const queryVec = await generateEmbedding(query);
  const results = await index.namespace(namespace).query({
    topK,
    vector: queryVec,
    includeMetadata: true
  });
  return results.matches || [];
}

module.exports = { generateEmbedding, queryContext };
