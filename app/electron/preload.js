const { contextBridge, ipcRenderer } = require("electron");

console.log(ipcRenderer);
contextBridge.exposeInMainWorld(
    "electron",
    {
        ipcRenderer: ipcRenderer
    }
);