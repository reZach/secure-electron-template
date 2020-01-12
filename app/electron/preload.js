const { ipcRenderer } = require("electron");

window.api = {
    ipc: ipcRenderer
};

// // Once https://github.com/electron/electron/issues/21437 is fixed, use this code pattern instead!
// const {
//     contextBridge,
//     ipcRenderer
// } = require("electron");

// contextBridge.exposeInMainWorld(
//     "api", {
//         ipc: {
//             on: ipcRenderer.on,
//             send: ipcRenderer.send
//         }
//     }
// );