// testRegister.js
const { handler } = require("../handlers/createProjectHandler");

const mockEvent = {
  body: JSON.stringify({
    userId: "test-user-123",
    fullName: "Test User",
    email: "test@example.com",
    frontendUrl:"thetechshaikh.online",
    projectName:"project-test"
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

