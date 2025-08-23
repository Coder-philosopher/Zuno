// aws/handlers/registerHandler.js

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');

const isLocal = process.env.IS_OFFLINE === "true";

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient(
    isLocal
      ? {
          region: "local",
          endpoint: "http://localhost:8000",
          credentials: {
            accessKeyId: "dummy",
            secretAccessKey: "dummy",
          },
        }
      : { region: process.env.AWS_REGION }
  )
);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { userId, fullName, email } = body;

    if (!userId || !email || !fullName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required user fields: userId, fullName, email' }),
      };
    }

    // Check if user already exists
    const existingUser = await ddb.send(
      new GetCommand({
        TableName: process.env.USERS_TABLE,
        Key: { userId },
      })
    );

    if (existingUser.Item) {
      // User already registered, return success with existing user info (optional)
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

    await ddb.send(
      new PutCommand({
        TableName: process.env.USERS_TABLE,
        Item: newUser,
      })
    );

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
