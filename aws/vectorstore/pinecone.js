const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { Pinecone } = require('@pinecone-database/pinecone');
const crypto = require('crypto');
require('dotenv').config();

// ---- ENV variable validation ----
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

if (!PINECONE_API_KEY || !PINECONE_INDEX_NAME) {
  throw new Error(
    'Set PINECONE_API_KEY and PINECONE_INDEX_NAME in your .env file'
  );
}

// ---- Initialize Pinecone client ----
const pc = new Pinecone({
  apiKey: PINECONE_API_KEY, // No need for environment anymore
});

// ---- Get index reference ----
async function initPinecone() {
  return pc.Index(PINECONE_INDEX_NAME);
}

// ---- Embed text using llama-text-embed-v2 ----
async function embedText(text) {
  const model = 'llama-text-embed-v2';

  const response = await pc.inference.embed(
    model,
    [text],
    { inputType: 'passage', truncate: 'END' } // note: camelCase per 2025 API
  );

  // SDK returns { data: [ { values: [...] } ] }
  if (!response?.data?.[0]?.values) {
    throw new Error('Embedding API returned no values');
  }

  return response.data[0].values;
}

// ---- Split PDF into 600-word chunks ----
async function parsePdfToChunks(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);

  const words = pdfData.text.split(/\s+/);
  const chunks = [];

  for (let i = 0; i < words.length; i += 600) {
    const chunkText = words.slice(i, i + 600).join(' ').trim();

    if (chunkText.length > 20) {
      chunks.push({
        id: crypto.createHash('sha256')
          .update(filePath + '-' + i)
          .digest('hex'),
        text: chunkText,
        startWord: i + 1,
        endWord: Math.min(i + 600, words.length),
      });
    }
  }
  return chunks;
}

// ---- Upsert chunks into Pinecone ----
async function upsertPdfVectors(filePath) {
  const index = await initPinecone();
  const chunks = await parsePdfToChunks(filePath);

  if (chunks.length === 0) {
    throw new Error('No meaningful text chunks extracted from PDF');
  }

  // Prepare vectors
  const vectors = [];
  for (const chunk of chunks) {
    const embedding = await embedText(chunk.text);  // Get the embedding for the chunk
    
    // Ensure embedding is an array of numbers
    if (!Array.isArray(embedding)) {
      throw new Error(`Expected embedding to be an array, but got: ${typeof embedding}`);
    }

    // Format each vector to match the structure required by `index.upsert`
    vectors.push({
      id: chunk.id,                  // Unique ID for the vector
      values: embedding,              // The embedding vector (array of numbers)
      metadata: {                     // Optional metadata
        source: path.basename(filePath),
        startWord: chunk.startWord,
        endWord: chunk.endWord,
        textExcerpt: chunk.text.slice(0, 100), // Excerpt of the text (first 100 chars)
      }
    });
  }

  // ---- Log vectors to verify structure ----
  console.log(`Upserting ${vectors.length} vectors.`, vectors);

  // ---- Batch upserts in chunks of up to 1000 ----
  const MAX_BATCH_SIZE = 1000;
  for (let i = 0; i < vectors.length; i += MAX_BATCH_SIZE) {
    const batch = vectors.slice(i, i + MAX_BATCH_SIZE);

    // Ensure that batch is an array and has elements
    if (Array.isArray(batch) && batch.length > 0) {
      try {
        await index.upsert({ vectors: batch }); // Pass batch to upsert
      } catch (e) {
        console.error('Pinecone upsert error:', e);
        throw e;
      }
    }
  }

  console.log(
    `✅ Upserted ${vectors.length} vectors from ${filePath} into Pinecone index "${PINECONE_INDEX_NAME}".`
  );
  return vectors.length;
}

// Sample usage
upsertPdfVectors('../samples/sample1.pdf')
  .then(count => console.log(`Inserted ${count} chunks.`))
  .catch(console.error);

module.exports = {
  upsertPdfVectors
};
