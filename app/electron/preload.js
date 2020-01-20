const {
    contextBridge,
    ipcRenderer
} = require("electron");
const i18nextBackend = require("i18next-electron-fs-backend");
const Store = require("secure-electron-store").default;

let store;
let storePath = "";
try {
    storePath = process.argv.filter(p => p.indexOf("storePath:") >= 0)[0].split(":")[1];    
} catch (error) {
    throw "Could not find 'additionalArguments' value beginning with 'storePath:' in your BrowserWindow. Please ensure this is set!";
} finally {
    store = new Store({
        path: storePath
    });
}


// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer),
        store: store.preloadBindings(ipcRenderer)
    }
);