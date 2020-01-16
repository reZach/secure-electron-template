const {
    contextBridge,
    ipcRenderer
} = require("electron");
const i18nextBackend = require("i18next-electron-fs-backend");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer)
    }
);