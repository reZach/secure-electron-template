const { Menu, MenuItem, BrowserWindow } = require("electron");
const i18nBackend = require("i18next-electron-fs-backend");
const whitelist = require("../localization/whitelist");
const isMac = process.platform === "darwin";

var MenuBuilder = function(mainWindow, appName) {

  // https://electronjs.org/docs/api/menu#main-process
  let defaultTemplate = function() {
    return [
      // { role: "appMenu" }
      ...(isMac
        ? [
            {
              label: appName,
              submenu: [
                {
                  role: "about"
                },
                {
                  type: "separator"
                },
                {
                  role: "services"
                },
                {
                  type: "separator"
                },
                {
                  role: "hide"
                },
                {
                  role: "hideothers"
                },
                {
                  role: "unhide"
                },
                {
                  type: "separator"
                },
                {
                  role: "quit"
                }
              ]
            }
          ]
        : []),
      // { role: "fileMenu" }
      {
        label: "File",
        submenu: [
          isMac
            ? {
                role: "close"
              }
            : {
                role: "quit"
              }
        ]
      },
      // { role: "editMenu" }
      {
        label: "Edit",
        submenu: [
          {
            role: "undo"
          },
          {
            role: "redo"
          },
          {
            type: "separator"
          },
          {
            role: "cut"
          },
          {
            role: "copy"
          },
          {
            role: "paste"
          },
          ...(isMac
            ? [
                {
                  role: "pasteAndMatchStyle"
                },
                {
                  role: "delete"
                },
                {
                  role: "selectAll"
                },
                {
                  type: "separator"
                },
                {
                  label: "Speech",
                  submenu: [
                    {
                      role: "startspeaking"
                    },
                    {
                      role: "stopspeaking"
                    }
                  ]
                }
              ]
            : [
                {
                  role: "delete"
                },
                {
                  type: "separator"
                },
                {
                  role: "selectAll"
                }
              ])
        ]
      },
      // { role: "viewMenu" }
      {
        label: "View",
        submenu: [
          {
            role: "reload"
          },
          {
            role: "forcereload"
          },
          {
            role: "toggledevtools"
          },
          {
            type: "separator"
          },
          {
            role: "resetzoom"
          },
          {
            role: "zoomin"
          },
          {
            role: "zoomout"
          },
          {
            type: "separator"
          },
          {
            role: "togglefullscreen"
          }
        ]
      },
      // language menu
      {
        label: "Language",
        submenu: whitelist.buildSubmenu(i18nBackend.changeLanguageRequest)
      },
      // { role: "windowMenu" }
      {
        label: "Window",
        submenu: [
          {
            role: "minimize"
          },
          {
            role: "zoom"
          },
          ...(isMac
            ? [
                {
                  type: "separator"
                },
                {
                  role: "front"
                },
                {
                  type: "separator"
                },
                {
                  role: "window"
                }
              ]
            : [
                {
                  role: "close"
                }
              ])
        ]
      },
      {
        role: "help",
        submenu: [
          {
            label: "Learn More",
            click: async () => {
              const { shell } = require("electron");
              await shell.openExternal("https://electronjs.org");
            }
          }
        ]
      }
    ];
  };

  return {
    buildMenu: function() {
      const menu = Menu.buildFromTemplate(defaultTemplate());
      Menu.setApplicationMenu(menu);

      return menu;
    }
  };
};

module.exports = MenuBuilder;
