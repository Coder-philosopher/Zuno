// aws/services/db.js
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, QueryCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

async function getProjectByApiKeyHash(apiKeyHash) {
  // 1: Look up API key mapping in APIKEYS_TABLE
  const apiKeyParams = {
    TableName: process.env.APIKEYS_TABLE,
    IndexName: 'ApiKeyHashIndex', // GSI on apiKeyHash → projectId
    KeyConditionExpression: 'apiKeyHash = :h',
    ExpressionAttributeValues: { ':h': apiKeyHash },
    Limit: 1
  };

  const apiKeyResult = await docClient.send(new QueryCommand(apiKeyParams));
  const apiKeyRecord = apiKeyResult.Items?.[0];
  if (!apiKeyRecord) return null;

  // 2: Get the full project record from PROJECTS_TABLE
  const projectParams = {
    TableName: process.env.PROJECTS_TABLE,
    Key: { projectId: apiKeyRecord.projectId }
  };

  const projectResult = await docClient.send(new GetCommand(projectParams));
  const project = projectResult.Item;

  if (!project) return null;

  // 3: Return combined project info INCLUDING developer's LLM config
  return {
    ...project,
    // security measure: never expose hash values outside middleware
    apiKeyHash: undefined
  };
}

module.exports = {
  getProjectByApiKeyHash
};
