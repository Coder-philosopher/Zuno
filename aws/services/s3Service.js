// aws/services/s3Service.js
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const stream = require('stream');
const REGION = process.env.AWS_REGION || 'us-east-1';
const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'your-zuno-bucket';

const s3Client = new S3Client({ region: REGION });

// Upload buffer or stream to S3
async function uploadFile(key, body, contentType) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  };
  await s3Client.send(new PutObjectCommand(params));
  return `s3://${BUCKET_NAME}/${key}`;
}

// Download file (returns a stream)
async function getFileStream(key) {
  const params = { Bucket: BUCKET_NAME, Key: key };
  const data = await s3Client.send(new GetObjectCommand(params));
  return data.Body; // This is a readable stream
}

module.exports = {
  uploadFile,
  getFileStream,
};
