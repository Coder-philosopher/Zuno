// aws/handlers/createProjectHandler.js
require("dotenv").config();

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  PutCommand,
} = require('@aws-sdk/lib-dynamodb');
const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const crypto = require('crypto');

// 👇 Redirect DynamoDB to local if LOCAL_DYNAMO=true
const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: 'local',
    endpoint: 'http://localhost:8000',
  })
);

const lambda = new LambdaClient({ region: process.env.AWS_REGION });

function hashKey(apiKey) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const {
      userId,
      fullName,      // optional for verification
      email,         // optional for verification
      frontendUrl,
      projectName,
      plan,
      // Premium-only fields (optional)
      llmApiKey,     // user-provided model API key (premium)
      llmModel,
      apiKey,        // premium user’s API key or blank for free
    } = body;

    if (!userId || !frontendUrl || !projectName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: userId, frontendUrl, projectName' }),
      };
    }

    // STEP 1: Verify user exists
    const userResult = await ddb.send(
      new GetCommand({
        TableName: process.env.USERS_TABLE,
        Key: { userId },
      })
    );

    if (!userResult.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found, please register first' }),
      };
    }

    const user = userResult.Item;

    // STEP 2: Check if frontendUrl already has a project
    const projectScan = await ddb.send(
      new QueryCommand({
        TableName: process.env.PROJECTS_TABLE,
        IndexName: 'FrontendUrlIndex',
        KeyConditionExpression: 'frontendUrl = :url',
        ExpressionAttributeValues: { ':url': frontendUrl },
      })
    );

    if (projectScan.Items && projectScan.Items.length > 0) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'Frontend URL already registered with another project' }),
      };
    }

    // STEP 3: Enforce user project creation limit for free plan
    const userProjectsCountResp = await ddb.send(
      new QueryCommand({
        TableName: process.env.PROJECTS_TABLE,
        IndexName: 'OwnerIdIndex',
        KeyConditionExpression: 'ownerId = :uid',
        ExpressionAttributeValues: { ':uid': userId },
        Select: 'COUNT',
      })
    );

    const existingProjectCount = userProjectsCountResp.Count || 0;
    const effectivePlan = plan || user.plan || 'free';

    if (effectivePlan === 'free' && existingProjectCount >= 2) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Free plan allows max 2 projects only' }),
      };
    }

    // STEP 4: Prepare project record
    const projectId = `proj_${crypto.randomBytes(8).toString('hex')}`;
    const newApiKey = apiKey || `key_${crypto.randomBytes(24).toString('hex')}`;
    const apiKeyHash = hashKey(newApiKey);

    const projectItem = {
      projectId,
      ownerId: userId,
      projectName,
      frontendUrl,
      plan: effectivePlan,
      apiKeyHash,
      tokensUsed: 0,
      createdAt: new Date().toISOString(),
      llmApiKey: effectivePlan === 'premium' ? llmApiKey || null : null,
      llmModel: effectivePlan === 'premium' ? llmModel || null : null,
      apiKeyEnabled: true,
    };

    // STEP 5: Insert project record
    await ddb.send(
      new PutCommand({
        TableName: process.env.PROJECTS_TABLE,
        Item: projectItem,
      })
    );

    // STEP 6: Insert API key record for lookup
    await ddb.send(
      new PutCommand({
        TableName: process.env.APIKEYS_TABLE,
        Item: {
          keyId: `key_${crypto.randomBytes(10).toString('hex')}`,
          apiKeyHash,
          projectId,
        },
      })
    );

    // STEP 7: Async scraping Lambda invoke
    const scrapingPayload = {
      projectId,
      frontendUrl,
    };

    const invokeCommand = new InvokeCommand({
      FunctionName: process.env.SCRAPING_LAMBDA_FUNCTION_NAME,
      InvocationType: 'Event',
      Payload: Buffer.from(JSON.stringify(scrapingPayload)),
    });

    await lambda.send(invokeCommand);

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        projectId,
        apiKey: newApiKey,
        plan: effectivePlan,
        message: 'Project created successfully, scraping started in background.',
      }),
    };
  } catch (error) {
    console.error('createProjectHandler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' }),
    };
  }
};
