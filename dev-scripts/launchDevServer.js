const fs = require("fs");
const {
  exec
} = require("child_process");
const logFilePath = "./dev-scripts/webpack-dev-server.log";
const errorLogFilePath = "./dev-scripts/webpack-dev-server-error.log";
const interval = 100;

// Poll webpack-dev-server.log until the webpack bundle has compiled successfully
const intervalId = setInterval(function () {
  try {
    if (fs.existsSync(logFilePath)) {
      const log = fs.readFileSync(logFilePath, {
        encoding: "utf8"
      });

      // "Compiled successfully." is the string we need to find
      // to know that webpack is done bundling everything and we
      // can load our Electron app with no issues.
      if (log.indexOf("Compiled successfully.") >= 0) {
        console.log("Webpack development server is ready, launching Electron app.");
        clearInterval(intervalId);

        // Start our electron app
        const electronProcess = exec("cross-env NODE_ENV=development electron .");
        electronProcess.stdout.on("data", function(data) {
          process.stdout.write(data);
        });
      } else if (log.indexOf("Failed to compile.") >= 0) {

        if (fs.existsSync(errorLogFilePath)) {
          const errorLog = fs.readFileSync(errorLogFilePath, {
            encoding: "utf8"
          });

          console.log(errorLog);
          console.log(`Webpack failed to compile; this error has also been logged to '${errorLogFilePath}'.`);
          clearInterval(intervalId);

          return process.exit(1);
        } else {
          console.log("Webpack failed to compile, but the error is unknown.")
          clearInterval(intervalId);

          return process.exit(1);
        }
      }
    }
  } catch (error) {
    // Exit with an error code
    console.error("Webpack or electron fatal error" + error);
    clearInterval(intervalId);

    return process.exit(1);
  }
}, interval);