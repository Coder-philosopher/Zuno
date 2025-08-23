const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { Pinecone } = require("@pinecone-database/pinecone");
const crypto = require("crypto");

const s3 = new S3Client({
  region: "us-east-1", // arbitrary, MinIO ignores
  endpoint: "http://localhost:9000", // MinIO endpoint (matches docker-compose.yml)
  forcePathStyle: true, // required for MinIO
  credentials: {
    accessKeyId: "minioadmin",
    secretAccessKey: "minioadmin",
  },
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

async function streamToString(readableStream) {
  const chunks = [];
  for await (const chunk of readableStream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

async function chunkText(text, wordsPerChunk = 600) {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += wordsPerChunk) {
    chunks.push(words.slice(i, i + wordsPerChunk).join(" "));
  }
  return chunks;
}

exports.handler = async (event) => {
  try {
    const { projectId, s3Bucket, s3Key } = event;

    if (!projectId || !s3Bucket || !s3Key)
      throw new Error("Missing required parameters.");

    const s3Response = await s3.send(
      new GetObjectCommand({
        Bucket: s3Bucket,
        Key: s3Key,
      })
    );

    const fileContent = await streamToString(s3Response.Body);
    const chunks = await chunkText(fileContent, 600);

    const namespace = projectId;
    const vectors = [];

    for (const chunk of chunks) {
      const id = crypto.createHash("sha256").update(chunk).digest("hex");
      vectors.push({
        id,
        values: await getEmbedding(chunk),
        metadata: { text: chunk.slice(0, 200) },
      });
    }

    const BATCH_SIZE = 100;
    for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
      const batch = vectors.slice(i, i + BATCH_SIZE);
      await index.namespace(namespace).upsert({ vectors: batch });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Embedding upload complete",
        chunks: vectors.length,
      }),
    };
  } catch (error) {
    console.error("Embedding Lambda error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

async function getEmbedding(text) {
  const embedResponse = await pinecone.inference.embed({
    model: "llama-text-embed-v2",
    input: text,
  });

  if (!embedResponse?.data?.[0]?.values)
    throw new Error("Failed to generate embedding");

  return embedResponse.data[0].values; // fixed indexing
}
