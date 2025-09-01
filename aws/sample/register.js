// testRegister.js
const { handler } = require("../handlers/registerHandler");

const mockEvent = {
  body: JSON.stringify({
    userId: "test-user-123",
    fullName: "Test User",
    email: "test@example.com",
  }),
};

console.log("Invoking handler with event:", mockEvent);

handler(mockEvent)
  .then((res) => {
    console.log("Lambda Response:", res);
  })
  .catch((err) => {
    console.error("Lambda Error:", err);
  });

