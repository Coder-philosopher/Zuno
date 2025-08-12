// aws/services/dynamoDBService.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const REGION = process.env.AWS_REGION || 'us-east-1';

const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// Example table names (set your real table names in env or config)
const USERS_TABLE = process.env.USERS_TABLE || 'ZunoUsers';
const APIKEYS_TABLE = process.env.APIKEYS_TABLE || 'ZunoApiKeys';

// Get user by ID
async function getUser(userId) {
  const params = {
    TableName: USERS_TABLE,
    Key: { userId }
  };
  const result = await ddbDocClient.send(new GetCommand(params));
  return result.Item;
}

// Create or update user
async function putUser(user) {
  const params = {
    TableName: USERS_TABLE,
    Item: user,
  };
  await ddbDocClient.send(new PutCommand(params));
  return user;
}

// Update attributes (example: plan)
async function updateUserPlan(userId, newPlan) {
  const params = {
    TableName: USERS_TABLE,
    Key: { userId },
    UpdateExpression: "set plan = :p",
    ExpressionAttributeValues: {
      ":p": newPlan,
    },
    ReturnValues: "ALL_NEW"
  };
  const result = await ddbDocClient.send(new UpdateCommand(params));
  return result.Attributes;
}

// Similarly, add more functions like getApiKeys, createApiKey, etc.

module.exports = {
  getUser,
  putUser,
  updateUserPlan,
};
