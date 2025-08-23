// createTables.js
import {
  DynamoDBClient,
  CreateTableCommand
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://localhost:8000", // DynamoDB local
});

// helper to create table if not exists
async function createTable(params) {
  try {
    await client.send(new CreateTableCommand(params));
    console.log(`✅ Created table: ${params.TableName}`);
  } catch (err) {
    if (err.name === "ResourceInUseException") {
      console.log(`ℹ️ Table already exists: ${params.TableName}`);
    } else {
      console.error(`❌ Error creating ${params.TableName}`, err);
    }
  }
}

async function main() {
  // 1. UsersTable
  await createTable({
    TableName: "zuno-users-local",
    AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
    KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST",
  });

  // 2. QueriesTable
  await createTable({
    TableName: "zuno-queries-local",
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST",
  });

  // 3. ApiKeysTable with GSI
  await createTable({
    TableName: "zuno-apikeys-local",
    AttributeDefinitions: [
      { AttributeName: "keyId", AttributeType: "S" },
      { AttributeName: "apiKeyHash", AttributeType: "S" },
    ],
    KeySchema: [{ AttributeName: "keyId", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST",
    GlobalSecondaryIndexes: [
      {
        IndexName: "ApiKeyHashIndex",
        KeySchema: [{ AttributeName: "apiKeyHash", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
  });

  // 4. ProjectsTable with GSI
  await createTable({
    TableName: "zuno-projects-local",
    AttributeDefinitions: [
      { AttributeName: "projectId", AttributeType: "S" },
      { AttributeName: "ownerId", AttributeType: "S" },
    ],
    KeySchema: [{ AttributeName: "projectId", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST",
    GlobalSecondaryIndexes: [
      {
        IndexName: "OwnerIdIndex",
        KeySchema: [{ AttributeName: "ownerId", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
  });
}

main();
