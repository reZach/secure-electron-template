/** i18next-electron-fs-backend
 * @author reZach (github)
 * @license MIT license
 * @link https://github.com/reZach/i18next-electron-fs-backend
 * 
 * THIS IS STILL A WIP BACKEND. DUE TO https://github.com/electron/electron/issues/21437 THIS BACKEND STILL CANNOT BE IMPLEMENTED!
 */

const merge = require("lodash.merge");

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
var UUID = (function () {
    var self = {};
    var lut = [];
    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
    }
    self.generate = function () {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
            lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
            lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
            lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
    }
    return self;
})();


var mergeNested = function(obj, path, split, val){    
    let tokens = path.split(split);
    let temp = {};
    let temp2;
    temp[`${tokens[tokens.length - 1]}`] = val;
    for(var i = tokens.length - 2; i >= 0; i--) {
        temp2 = {};
        temp2[`${tokens[i]}`] = temp;
        temp = temp2;
    }
    return merge(obj, temp);
}


const defaultOptions = {
    loadPath: "/locales/{{lng}}/{{ns}}.json", // Where the translation files get loaded from
    addPath: "/locales/{{lng}}/{{ns}}.missing.json", // Where the missing translation files get generated
    delay: 300
};
// Electron-specific; must match mainIpc
export const readFileRequest = "ReadFile-Request";
export const writeFileRequest = "WriteFile-Request";
export const readFileResponse = "ReadFile-Response";
export const writeFileResponse = "WriteFile-Response";

// // Writes to the translation .json files
// let _writeFile = function (fs, filename, data, callback) {
//     fs.writeFile(filename, JSON.stringify(data), (error) => {
//         callback(error);
//     });
//     callback(null, "success");
// }

// Template is found at: https://www.i18next.com/misc/creating-own-plugins#backend;
// also took code from: https://github.com/i18next/i18next-node-fs-backend
class Backend {
    constructor(services, backendOptions = {}, i18nextOptions = {}) {
        this.init(services, backendOptions, i18nextOptions);

        this.readCallbacks = {};
        this.writeCallbacks = {};
        this.writeQueue = {};
        this.writeQueueBuffer = {};
    }

    init(services, backendOptions, i18nextOptions) {
        if (typeof window.api.ipc === "undefined") {
            throw "'window.api.ipc' is not defined!"; // todo better error
        }

        this.services = services;
        this.backendOptions = {
            ...defaultOptions,
            ...backendOptions,
            ipc: window.api.ipc
        };
        this.i18nextOptions = i18nextOptions;

        this.setupIpcBindings();
    }

    // Sets up Ipc bindings so that we can keep any node-specific
    // modules; (ie. 'fs') out of the Electron renderer process
    setupIpcBindings() {
        const {
            ipc
        } = this.backendOptions;

        ipc.on(readFileResponse, (IpcRendererEvent, args) => {
            // args:
            // {
            //   key
            //   error
            //   data
            // }
            

            // Don't know why we need this line;
            // upon initialization, the i18next library
            // ends up in this .on([channel], args) method twice
            if (typeof this.readCallbacks[args.key] === "undefined") return;

            let callback;

            if (args.error) {
                // Failed to read translation file;
                // we pass back a fake "success" response
                // so that we create a translation file
                callback = this.readCallbacks[args.key].callback;
                delete this.readCallbacks[args.key];
                if (callback !== null && typeof callback === "function") callback(null, {});
            } else {
                let result;
                args.data = args.data.replace(/^\uFEFF/, "");
                try {
                    result = JSON.parse(args.data);
                } catch (parseError) {
                    parseError.message = `Error parsing '${args.filename}'. Message: '${parseError}'.`;
                    callback = this.readCallbacks[args.key].callback;
                    delete this.readCallbacks[args.key];
                    if (callback !== null && typeof callback === "function") callback(parseError);
                    return;
                }
                callback = this.readCallbacks[args.key].callback;
                delete this.readCallbacks[args.key];
                if (callback !== null && typeof callback === "function") callback(null, result);
            }
        });

        ipc.on(writeFileResponse, (IpcRendererEvent, args) => {
            // args:
            // {
            //   key
            //   error
            // }
            
            let callback;

            // Write methods don't have any callbacks from what I've seen,
            // so this is called more than I thought; but necessary!
            if (typeof this.writeCallbacks[args.key] === "undefined") return;

            if (args.error) {
                callback = this.writeCallbacks[args.key].callback;
                delete this.writeCallbacks[args.key];
                callback(args.error);
            } else {
                callback = this.writeCallbacks[args.key].callback;
                delete this.writeCallbacks[args.key];
                callback(null, true);
            }
        });
    }

    writeWrapper(func, args, delay) {
        setTimeout(func.apply(this, args), delay);
    }

    write(filename) {
        
        // Lock filename
        this.writeQueue[filename].locked = true;

        this.requestFileRead(filename, (error, data) => {
            
            if (error) {
                this.writeQueue[filename].locked = false;
                throw "err!";
            }

            let keySeparator = !!this.i18nextOptions.keySeparator;
            let updates = this.writeQueue[filename].updates;
            let callbacks = [];
            for (let i = 0; i < updates.length; i++) {
                if (!keySeparator){
                    data[updates[i].key] = updates[i].fallbackValue;
                } else {
                    // drill down and create nested structure
                    data = mergeNested(data, updates[i].key, this.i18nextOptions.keySeparator, updates[i].fallbackValue);
                }
                
                if (updates[i].callback !== null) callbacks.push(updates[i].callback);
            }
            delete this.writeQueue[filename];

            
            let anonymousBind = function(){
                
                // Move items from buffer
                let bufferKeys = Object.keys(this.writeQueueBuffer);
                for (let j = 0; j < bufferKeys.length; j++) {
                    this.writeQueue[bufferKeys[j]] = this.writeQueueBuffer[bufferKeys[j]];
                    delete this.writeQueueBuffer[bufferKeys[j]];
                }

                if (typeof this.writeQueue[filename] !== "undefined" && Object.keys(this.writeQueue[filename]).length > 0) {
                    // Unlock filename
                    this.writeQueue[filename].locked = false;

                    // Re-add timeout if elements exist
                    if (Object.keys(this.writeQueue[filename]).length > 0) {
                        this.writeQueue[filename].timeout = this.writeWrapper(this.write, [filename], this.backendOptions.delay);
                    }
                }
            }.bind(this);
            this.requestFileWrite(filename, data, callbacks, anonymousBind);
        });

        // Unlock filename
        this.writeQueue[filename].locked = false;
    }

    // Adds requests to the queue to update files
    addToWriteQueue(filename, key, fallbackValue, callback) {
        let obj; // holds properties for the queue

        
        if (typeof this.writeQueue[filename] === "undefined") {
            obj = {
                updates: [{
                    key,
                    fallbackValue,
                    callback
                }],
                locked: false
            };

            // re-update timeout
            this.writeQueue[filename] = obj;
            obj.timeout = this.writeWrapper(this.write, [filename], this.backendOptions.delay);
        } else if (!this.writeQueue[filename].locked) {
            obj = this.writeQueue[filename];
            obj.updates.push({
                key,
                fallbackValue,
                callback
            });

            // re-update timeout
            this.writeQueue[filename] = obj;
            obj.timeout = this.writeWrapper(this.write, [filename], this.backendOptions.delay);
        } else {

            // Hold any updates if we are currently locked on that filename;
            // we'll run these when we can later
            if (typeof this.writeQueueBuffer[filename] === "undefined") {
                this.writeQueueBuffer[filename] = {
                    updates: [{
                        key,
                        fallbackValue,
                        callback
                    }]
                };
            } else {
                this.writeQueueBuffer[filename].updates.push({
                    updates: [{
                        key,
                        fallbackValue,
                        callback
                    }]
                });
            }
        }
    }

    requestFileWrite(filename, data, callbacks, onCompleteCallback = null) {
        const {
            ipc
        } = this.backendOptions;

        
        // Save the callback for this request so we
        // can execute once the ipcRender process returns
        // with a value from the ipcMain process
        var key;
        if (callbacks.length > 0){
            for (let i = 0; i < callbacks.length; i++) {
                key = `${UUID.generate()}`;
                this.writeCallbacks[key] = {
                    callback: callbacks[i]
                };
    
                // Send out the message to the ipcMain process
                ipc.send(writeFileRequest, {
                    key,
                    filename,
                    data
                });
            }
        } else {
            key = `${UUID.generate()}`;

            // Send out the message to the ipcMain process
            ipc.send(writeFileRequest, {
                key,
                filename,
                data
            });
        }
        

        if (onCompleteCallback !== null) {
            onCompleteCallback();
        }
    }

    requestFileRead(filename, callback) {
        const {
            ipc
        } = this.backendOptions;

        // Save the callback for this request so we
        // can execute once the ipcRender process returns
        // with a value from the ipcMain process
        let key = `${UUID.generate()}`;
        this.readCallbacks[key] = {
            callback: callback
        };

        // Send out the message to the ipcMain process
        
        ipc.send(readFileRequest, {
            key,
            filename
        });
    }

    // Reads a given translation file
    read(language, namespace, callback) {
        
        const {
            loadPath
        } = this.backendOptions;
        let filename = this.services.interpolator.interpolate(loadPath, {
            lng: language,
            ns: namespace
        });

        this.requestFileRead(filename, (error, data) => {
            
            if (error) return callback(error, false); // no retry
            callback(null, data);
        });
    }

    // Not implementing at this time
    readMulti(languages, namespaces, callback) {
        throw "Not implemented exception.";
    }

    // Writes a missing translation to file
    create(languages, namespace, key, fallbackValue, callback) {
        
        const {
            addPath
        } = this.backendOptions;
        let filename;
        languages = typeof languages === "string" ? [languages] : languages;

        for (let i = 0; i < languages.length; i++) {
            filename = this.services.interpolator.interpolate(addPath, {
                lng: languages[i],
                ns: namespace
            });

            this.addToWriteQueue(filename, key, fallbackValue, callback);
        }
    }
}
Backend.type = "backend";

export default Backend;