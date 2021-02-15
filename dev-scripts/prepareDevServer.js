const fs = require("fs");
const {
  exec
} = require("child_process");
const logFilePath = "./dev-scripts/webpack-dev-server.log";

console.log("Preparing webpack development server.");

// Delete the old webpack-dev-server.log if it is present
try {
  fs.unlinkSync(logFilePath);
} catch (error) {
  // Existing webpack-dev-server log file may not exist
}

// Start the webpack development server
exec("npm run dev-server");