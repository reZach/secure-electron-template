const fs = require("fs");
const {
  exec
} = require("child_process");
const logFilePath = "./dev-scripts/webpack-dev-server.log";
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
        exec("cross-env NODE_ENV=development electron .", (error, stdout, stderr) => {
          if (error){
            console.error(error);
          }
          if (stdout) {
            console.log(stdout);
          }
          if (stderr) {
            console.error(stderr);
          }
        });
      }
    }
  } catch (error) {
    // Exit with an error code
    console.error("Webpack or electron fatal error" + error);
    clearInterval(intervalId);

    return process.exit(1);
  }
}, interval);