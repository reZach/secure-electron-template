const {
  app,
  BrowserWindow,
  session
} = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "../dist/index.html"));

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

  // https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content
  const ses = session;
  ses.fromPartition("default").setPermissionRequestHandler((webContents, permission, callback) => {
    return callback(false);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    console.log(JSON.stringify(parsedUrl));
    const validOrigins = [];

    // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(`The application tried to redirect to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`);

      event.preventDefault();
      return;
    }
  });
  contents.on("will-redirect", (event, navigationUrl) => {

    // Log and prevent the app from redirecting to a new page
    console.error(`The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`);

    event.preventDefault();
    return;
  });
});

// https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows
app.on("web-contents-created", (event, contents) => {
  contents.on("new-window", async (event, navigationUrl) => {

    // Log and prevent opening up a new window        
    console.error(`The application tried to open a new window at the following address: '${navigationUrl}'. This attempt was blocked.`);

    event.preventDefault();
    return;
  });
});