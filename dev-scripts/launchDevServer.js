const fs = require("fs");
const {
  exec
} = require("child_process");
const logFilePath = "./dev-scripts/webpack-dev-server.log";
const errorLogFilePath = "./dev-scripts/webpack-dev-server-error.log";
const interval = 100;
const showHint = 600 * 3; // show hint after 3 minutes (60 sec * 3)
let hintCounter = 1;

// Poll webpack-dev-server.log until the webpack bundle has compiled successfully
const intervalId = setInterval(function () {
  try {
    if (fs.existsSync(logFilePath)) {
      const log = fs.readFileSync(logFilePath, {
        encoding: "utf8"
      });

      // "compiled successfully" is the string we need to find
      // to know that webpack is done bundling everything and we
      // can load our Electron app with no issues. We split up the
      // validation because the output contains non-standard characters.
      const compiled = log.indexOf("compiled");
      if (compiled >= 0 && log.indexOf("successfully", compiled) >= 0) {
        console.log("Webpack development server is ready, launching Electron app.");
        clearInterval(intervalId);

        // Start our electron app
        const electronProcess = exec("cross-env NODE_ENV=development electron .");
        electronProcess.stdout.on("data", function(data) {
          process.stdout.write(data);
        });
        electronProcess.stderr.on("data", function(data) {
          process.stdout.write(data);
        });
      } else if (log.indexOf("Module build failed") >= 0) {

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
      } else {
        hintCounter++;

        // Show hint so user is not waiting/does not know where to
        // look for an error if it has been thrown and/or we are stuck
        if (hintCounter > showHint){
          console.error(`Webpack is likely failing for an unknown reason, please check '${errorLogFilePath}' for more details.`);
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