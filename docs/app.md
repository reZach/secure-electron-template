# App
The main location where all of your application code lives. Inside this folder are 4 sub-folders:
```
dist/
electron/
localization/
src/
```

#### dist
This folder holds bundled files from webpack. You shouldn't be modifying anything in this folder, the files contained within will be regenerated upon build (dev or production).

#### electron
Electron-specific files. These would be the main file that creates the window (`main.js`), the menu bar (`menu.js`) or the preload script (`preload.js`).

> In the main.js file you would configure the app window and any app specific event handlers or setup IPC (inter-process-communication). The menu bar is self-explanatory so I will skip saying anything about that file. The preload.js file is where you expose, [_safely_](https://blog.doyensec.com/2019/04/03/subverting-electron-apps-via-insecure-preload.html), node symbols so that your renderer process can use them.

#### localization
A folder that will holds localized files of translations for your app. This setup is assuming you would be using translations offline and not call out to a webservice to translate your app. If you'd like to use another method of translating, i18next names each provider a "backend;" you can browse the list of them [here](https://www.i18next.com/overview/plugins-and-utils#backends).

> Note, there may be limited support for i18next plugins that implement secure practices! I wouldn't be surprised if most of them didn't work with this template! You might just have to write your own, like I did!

#### src
Application-specific files, these are your js/css files and everything else you are used to. A more detailed look of this directory is [here](https://github.com/reZach/secure-electron-template/blob/master/docs/src.md).