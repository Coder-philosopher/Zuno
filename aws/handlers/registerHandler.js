// aws/handlers/registerHandler.js
require("dotenv").config();

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');

const isLocal = "true";

console.log("Environment variables:", {
  USERS_TABLE: process.env.USERS_TABLE,
  AWS_REGION: process.env.AWS_REGION,
});

const ddbClientConfig = isLocal
  ? {
      region: "local",
      endpoint: "http://localhost:8000",
      credentials: {
        accessKeyId: "dummy",
        secretAccessKey: "dummy",
      },
    }
  : { region: process.env.AWS_REGION };

console.log("DynamoDB Client Config:", ddbClientConfig);

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient(ddbClientConfig));

exports.handler = async (event) => {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));

    const body = JSON.parse(event.body || '{}');
    console.log("Parsed body:", body);

    const { userId, fullName, email } = body;

    if (!userId || !email || !fullName) {
      console.warn("Missing required fields in request body");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required user fields: userId, fullName, email' }),
      };
    }

    const tableName = process.env.USERS_TABLE;
    console.log("Using DynamoDB table:", tableName);

    if (!tableName) {
      console.error("USERS_TABLE env variable is missing or empty");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server misconfiguration: USERS_TABLE is not set" }),
      };
    }

    // Check if user already exists
    console.log(`Checking if user ${userId} exists in table ${tableName}...`);
    const existingUser = await ddb.send(
      new GetCommand({
        TableName: tableName,
        Key: { userId },
      })
    );

    console.log("DynamoDB GetCommand response:", existingUser);

    if (existingUser.Item) {
      console.log(`User ${userId} already exists`);
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'User already registered',
          user: existingUser.Item,
        }),
      };
    }

    // New user: insert default user record
    const newUser = {
      userId,
      fullName,
      email,
      plan: 'free',                  // default plan
      maxProjects: 2,                // free plan limit
      projectCount: 0,
      tokensUsed: 0,
      createdAt: new Date().toISOString(),
    };

    console.log("Creating new user:", newUser);

    const putResult = await ddb.send(
      new PutCommand({
        TableName: tableName,
        Item: newUser,
      })
    );

    console.log("DynamoDB PutCommand result:", putResult);

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: 'User registered successfully',
        user: newUser,
      }),
    };
  } catch (error) {
    console.error('Error in registerHandler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
