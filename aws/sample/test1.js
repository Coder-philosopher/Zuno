const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "local",
  endpoint: "http://localhost:8000",
});

async function main() {
  try {
    const tables = await client.send(new ListTablesCommand({}));
    console.log("Tables:", tables.TableNames);
  } catch (error) {
    console.error("Error listing tables:", error);
  }
}

main();
