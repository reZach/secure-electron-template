const { contextBridge } = require("electron");
const fs = require("fs");

console.log("ABC");
console.log(fs);

contextBridge.exposeInMainWorld(
    "test",
    {
        fs: fs
    }
);