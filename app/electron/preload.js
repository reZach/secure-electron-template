const {
  contextBridge,
  ipcRenderer
} = require("electron");


console.log(process);
// const fs = require("fs");
// const i18nextBackend = require("i18next-electron-fs-backend");
// const Store = require("secure-electron-store").default;
// const ContextMenu = require("secure-electron-context-menu").default;

// // Create the electron store to be made available in the renderer process
// const store = new Store();

const sandboxParserHelper = function(argv){
  const arg = process.argv.find(a => a.indexOf(`--${argv}`) === 0);
  
  if (typeof arg === "undefined"){
    throw `Error when configuring sandbox options for module '${argv}'.`;
  }

  const colon = arg.indexOf(":");
  const split = [arg.substr(0, colon), arg.substr(colon + 1)];
  console.log("random_string = " + split[1].replaceAll("\\s", " "));
  eval("var newFn = " + split[1].replaceAll("\\s", " ") + ";");

  console.log("3");
  console.log(newFn);
  return newFn;
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  i18nextElectronBackend: (sandboxParserHelper("i18nelectronbackend"))(ipcRenderer),
  //store: store.preloadBindings(ipcRenderer, fs),
  //contextMenu: ContextMenu.preloadBindings(ipcRenderer)
});