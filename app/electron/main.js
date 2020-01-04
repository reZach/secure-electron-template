const {
  app,
  BrowserWindow,
  session
} = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const port = 40992; // Hardcoded; needs to match webpack.development.js and package.json
const selfHost = `http://localhost:${port}`;

// Installs extensions useful for development;
// https://github.com/electron-react-boilerplate/electron-react-boilerplate/blob/master/app/main.dev.js
// NOTE - if you'd like to run w/ these extensions when testing w/o electron, you need browser extensions to be installed (React Developer Tools & Redux DevTools)
const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {
  if (isDev){
    await installExtensions();
  }

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

  // Load app
  if (isDev) {
    win.loadURL(selfHost);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // Only do these things when in development
  if (isDev) {
    win.webContents.openDevTools();
    require("electron-debug")(); // https://github.com/sindresorhus/electron-debug
  }

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

    let allowedPermissions = []; // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest

    if (allowedPermissions.includes(permission)) {
      callback(true); // Approve permission request
    } else {
      console.error(`The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`);

      callback(false); // Deny
    }
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
    const validOrigins = [selfHost];

    // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(`The application tried to redirect to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`);

      event.preventDefault();
      return;
    }
  });

  contents.on("will-redirect", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    const validOrigins = [];

    // Log and prevent the app from redirecting to a new page
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(`The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`);

      event.preventDefault();
      return;
    }
  });

  // https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows
  contents.on("new-window", async (event, navigationUrl) => {

    // Log and prevent opening up a new window        
    console.error(`The application tried to open a new window at the following address: '${navigationUrl}'. This attempt was blocked.`);

    event.preventDefault();
    return;
  });
});