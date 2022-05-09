> **Update 2022**: A more comprehensive guide explaining Electron and secure practices can be [found here](https://www.debugandrelease.com/the-ultimate-electron-guide/).

# Are you new to electron?
Welcome, we are glad you are here and decided to learn more about electron. We'll be giving you a primer so you'll be well on your way to understanding electron and how you can write your apps with this template.

## Understanding web languages
It is assumed you have some elementary knowledge about web programming; namely that HTML positions elements, CSS styles elements, and JS adds interactivity into the page. You will know if you've been doing web programming for some time that the capabilities these languages offer you is limited [with comparison to say, desktop applications for example].

## What does electron provide?
Electron gives you access to electron / node apis that allow you to have more powerful functionality in your web applications. Think file system access, os access or c++ addons.

## How does electron provide these features?
Electron provides these features through Node through [`require`](https://nodejs.org/en/knowledge/getting-started/what-is-require/), or generally module-loading. In web pages, we add more functionality (generally) by including different script tags, in the Node environment, we get more functionality by including more modules. Features such as file system access come from [Node](https://nodejs.org/api/fs.html). Any Node api can be added to an electron app.

## How do I import modules into my app?
You _used_ to (and still can, but it's **not** recommended) use Node modules with the electron [`remote`](https://www.electronjs.org/docs/api/remote) api, but [it's not very secure](https://github.com/electron/electron/issues/9920#issuecomment-575839738). Beginning with [electron v5](https://www.electronjs.org/docs/breaking-changes#planned-breaking-api-changes-50) (which was released in April 24, 2019), the team recommended to use a different architecture to make use of these Node modules. This is IPC, inter-process communication.

![ipc](https://github.com/reZach/secure-electron-template/blob/master/docs/imgs/ipc.png "How IPC works")

## How does IPC work
IPC in itself doesn't _do_ anything, it simply allows you to send messages between the main and renderer processes. The idea behind IPC is that your **main** process controls and loads Node apis, while your **renderer** process tells the main process whenever it needs to use something that calls a Node api.

Setting up your app like this ensures that _bad actors_ cannot misuse the Node apis in your app. With the _old_ way (ie. `require`) of importing Node modules in your app, the client-facing part of your app had access to Node modules directly (which could end up with [bad consequences](https://blog.devsecurity.eu/en/blog/joplin-electron-rce)).

## Take a step back, what are main and renderer processes?
An electron app is broken up into [*normally; at least] two processes; a renderer and main process. The main process creates the app, using a [`BrowserWindow`](https://www.electronjs.org/docs/api/browser-window), which loads up a "browser", which is how electron loads up your HTML/CSS/JS content. The other process is your HTML/CSS/JS, all contained in a renderer process.

*Electron apps can load multiple windows, so you may have more than one renderer process in this case.

## Show me an example of how to use IPC to use a Node module

**main.js**
```javascript
const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "dist/index.html"));

  // rest of code..
}

app.on("ready", createWindow);

ipcMain.on("toMain", (event, args) => {
  fs.readFile("path/to/file", (error, data) => {
    // Do something with file contents

    // Send result back to renderer process
    win.webContents.send("fromMain", responseObj);
  });
});
```

**preload.js**
```javascript
const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
```

**index.html**
```html
<!doctype html>
<html lang="en-US">
<head>
    <meta charset="utf-8"/>
    <title>Title</title>
</head>
<body>
    <script>
        // Called when message received from main process
        window.api.receive("fromMain", (data) => {
            console.log(`Received ${data} from main process`);
        });

        // Send a message to the main process
        window.api.send("toMain", "some data");
    </script>
</body>
</html>
```

## You didn't explain what preload.js does!
If you noticed, in **main.js** we have this line:

```javascript
preload: path.join(__dirname, "preload.js") // use a preload script
```

This is the line that loads our preload script. A preload script is an electron concept. The preload script can define new variables for our renderer script, and (importantly) has access to `require`. Do you notice how we were able to use `window.api`?

Let's now look again at preload.js.

**preload.js**
```javascript
const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
```

We expose an `api` property on the window object with two functions, **send** and **receive**. These functions allow us to talk to (ie. send messages to) the main ipc process and react to it's responses. Now, the renderer process has [indirect] access to Node apis!

## Can you explain what these "channels" are for?

If you noticed in the previous code blocks, we are defining `validChannels`. `validChannels` are not an Electron concept, but a safelist of named identifiers in order that only necessary methods of a `require`'d module are available to be used in code. In other words, instead of allowing _all_ of the methods [`fs`](https://nodejs.dev/learn/the-nodejs-fs-module) has, we only allow features/methods we need. This follows the principle of [least privilege](https://www.cyberark.com/what-is/least-privilege/) - and is more secure.

Notice in this example how we make use of `fs` in our **main.js** file.

```javascript
const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "dist/index.html"));

  // rest of code..
}

app.on("ready", createWindow);

ipcMain.on("toMain", (event, args) => {
  fs.readFile("path/to/file", (error, data) => {
    // Do something with file contents

    // Send result back to renderer process
    win.webContents.send("fromMain", responseObj);
  });
});
```

We _only_ allow the [`.readFile`](https://nodejs.org/api/fs.html#fsreadfilepath-options-callback) method to be called. However, if our **preload**/**main** file looked something like this...

**preload.js**
```javascript
const {
    contextBridge,
    ipcRenderer
} = require("electron");

// POOR example of a secure way to send IPC messages
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            ipcRenderer.send(channel, data);
        },
        receive: (channel, func) => {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
);
```

**main.js**
```javascript
const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, "dist/index.html"));

  // rest of code..
}

app.on("ready", createWindow);

// Code would only be hit if channel was "fs"
ipcMain.on("fs", (event, args) => {
  var result = true;

  // We allow _any_ methods to be called here
  // dynamically. This example is what we should
  // NOT be doing.
  fs[args.method.toString()].apply(null, args.arguments);  

  // Send result back to renderer process
  win.webContents.send("fromfs", result); // return result to renderer process
});
```

Besides not being fully tested, the _idea_ is that the above code would allow _any_ method from `fs` to be called. This is a _bad security practice_ because it allows our code to call [`.copyFile`](https://nodejs.org/api/fs.html#fscopyfilesrc-dest-mode-callback), [`.mkdir`](https://nodejs.org/api/fs.html#fsmkdirpath-options-callback), [`.rmdir`](https://nodejs.org/api/fs.html#fsrmdirpath-options-callback) or potentially any other method that `fs` has access to call! This security breach would happen if the front-end code was compromised in any way (ie. if IPC messages were sent from our renderer process).

The general idea behind a safelist of channels is that we **define** what methods our code/app should support [through matching channel names in our preload/main files], instead of allowing _any_ methods that may not be used/introduce a possible vulnerability in our app.

## What the preload.js _used_ to look like (advanced info)

It's _important_ to recognize that older solutions before contextBridge were to set properties on the `window`, ie:

```javascript
const {
    ipcRenderer
} = require("electron");

window.send = function(channel, data){
    // whitelist channels
    let validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
    }
};

window.recieve = function(channel, func){
    let validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender` 
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
};
```

The obvious problem with this is that you can [override functions](https://stackoverflow.com/a/5409468/1837080) in javascript. A determined attacker could modify this function definition and then your backend (ie. main.js code) would not be safe. [With this api](https://www.electronjs.org/docs/api/context-bridge#contextbridge), we can be ensure the functions we expose to our renderer process cannot be tampered with.

From the electron docs:
> Any data / primitives sent in the API object become immutable and updates on either side of the bridge do not result in an update on the other side.

In other terms, because we use `contextBridge.exposeInMainWorld`, our renderer process cannot modify the definition of the functions we expose, protecting us from a possible security attack vector.

## Wrapping up
With these details, I hope I have explained the basics of electron to you and given you a quick run-down on how to _correctly_ set up a **secure** electron app [when you'd like to use Node apis]. You should be well on your way to developing the next killer app!

In case you were looking for a good starting point, this template [`secure-electron-template`](https://github.com/reZach/secure-electron-template) has the security features (and more!) we just described built-in. There are plenty of comments in the template describing these, and more, security enhancements. Check us out today!