const {
  app,
  BrowserWindow,
  session,
  ipcMain
} = require("electron");
const MenuBuilder = require("./menu");
const path = require("path");
const fs = require("fs");
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

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let menuBuilder;


async function createWindow() {
  if (isDev) {
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
  const partition = "default";
  ses.fromPartition(partition).setPermissionRequestHandler((webContents, permission, callback) => {

    let allowedPermissions = []; // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest

    if (allowedPermissions.includes(permission)) {
      callback(true); // Approve permission request
    } else {
      console.error(`The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`);

      callback(false); // Deny
    }
  });

  // https://electronjs.org/docs/tutorial/security#1-only-load-secure-content;
  // todo not currently working!
  // ses.fromPartition(partition).webRequest.onBeforeRequest(["*://*./*"], (listener) => {   
  //   if (listener.url.indexOf("http://") >= 0) {
  //     listener.callback({
  //       cancel: true
  //     });
  //   }
  // });

  menuBuilder = MenuBuilder(win);
  menuBuilder.buildMenu();
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

  // https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation
  contents.on("will-attach-webview", (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload;
    delete webPreferences.preloadURL;

    // Disable Node.js integration
    webPreferences.nodeIntegration = false;
  });

  // https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows
  contents.on("new-window", async (event, navigationUrl) => {

    // Log and prevent opening up a new window        
    console.error(`The application tried to open a new window at the following address: '${navigationUrl}'. This attempt was blocked.`);

    event.preventDefault();
    return;
  });
});


// THIS CODE BELOW CAN BE UNCOMMENTED WHEN
// https://github.com/electron/electron/issues/21437 IS SOLVED AND THIS TEMPLATE
// IS ENABLED WITH I18N SUPPORT. (STILL A WIP)

ipcMain.on("ReadFile-Request", (IpcMainEvent, args) => {
  let callback = function (error, data) {
    this.webContents.send("ReadFile-Response", {
      key: args.key,
      error,
      data: typeof data !== "undefined" && data !== null ? data.toString() : ""
    });
  }.bind(win);
  fs.readFile(args.filename, callback);
});

ipcMain.on("WriteFile-Request", (IpcMainEvent, args) => {
  let callback = function (error) {
    this.webContents.send("WriteFile-Response", {
      key: args.key,
      error
    });
  }.bind(win);
  

  // https://stackoverflow.com/a/51721295/1837080
  let separator = "/";
  const windowsSeparator = "\\";
  if (args.filename.includes(windowsSeparator)) separator = windowsSeparator;  
  let root = args.filename.slice(0, args.filename.lastIndexOf(separator));

  fs.mkdir(root, { recursive: true }, (error) => {
    fs.writeFile(args.filename, JSON.stringify(args.data), callback);
  });
});