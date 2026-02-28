const { Menu, MenuItem, BrowserWindow } = require("electron");
const i18nBackend = require("i18next-electron-fs-backend");
const whitelist = require("../localization/whitelist");
const isMac = process.platform === "darwin";

const MenuBuilder = function(mainWindow, appName) {

  // https://electronjs.org/docs/api/menu#main-process
  const defaultTemplate = function(i18nextMainBackend) {
    return [
      // { role: "appMenu" }
      ...(isMac
        ? [
            {
              label: appName,
              submenu: [
                {
                  role: "about",
                  label: i18nextMainBackend.t("About")
                },
                {
                  type: "separator"
                },
                {
                  role: "services",
                  label: i18nextMainBackend.t("Services")
                },
                {
                  type: "separator"
                },
                {
                  role: "hide",
                  label: i18nextMainBackend.t("Hide")
                },
                {
                  role: "hideothers",
                  label: i18nextMainBackend.t("Hide Others")
                },
                {
                  role: "unhide",
                  label: i18nextMainBackend.t("Unhide")
                },
                {
                  type: "separator"
                },
                {
                  role: "quit",
                  label: i18nextMainBackend.t("Quit")
                }
              ]
            }
          ]
        : []),
      // { role: "fileMenu" }
      {
        label: i18nextMainBackend.t("File"),
        submenu: [
          isMac
            ? {
                role: "close",
                label: i18nextMainBackend.t("Quit")
              }
            : {
                role: "quit",
                label: i18nextMainBackend.t("Exit")
              }
        ]
      },
      // { role: "editMenu" }
      {
        label: i18nextMainBackend.t("Edit"),
        submenu: [
          {
            role: "undo",
            label: i18nextMainBackend.t("Undo")
          },
          {
            role: "redo",
            label: i18nextMainBackend.t("Redo")
          },
          {
            type: "separator"
          },
          {
            role: "cut",
            label: i18nextMainBackend.t("Cut")
          },
          {
            role: "copy",
            label: i18nextMainBackend.t("Copy")
          },
          {
            role: "paste",
            label: i18nextMainBackend.t("Paste")
          },
          ...(isMac
            ? [
                {
                  role: "pasteAndMatchStyle",
                  label: i18nextMainBackend.t("Paste and Match Style")
                },
                {
                  role: "delete",
                  label: i18nextMainBackend.t("Delete")
                },
                {
                  role: "selectAll",
                  label: i18nextMainBackend.t("Select All")
                },
                {
                  type: "separator"
                },
                {
                  label: i18nextMainBackend.t("Speech"),
                  submenu: [
                    {
                      role: "startspeaking",
                      label: i18nextMainBackend.t("Start Speaking")
                    },
                    {
                      role: "stopspeaking",
                      label: i18nextMainBackend.t("Stop Speaking")
                    }
                  ]
                }
              ]
            : [
                {
                  role: "delete",
                  label: i18nextMainBackend.t("Delete")
                },
                {
                  type: "separator"
                },
                {
                  role: "selectAll",
                  label: i18nextMainBackend.t("Select All")
                }
              ])
        ]
      },
      // { role: "viewMenu" }
      {
        label: i18nextMainBackend.t("View"),
        submenu: [
          {
            role: "reload",
            label: i18nextMainBackend.t("Reload")
          },
          {
            role: "forcereload",
            label: i18nextMainBackend.t("Force Reload")
          },
          {
            role: "toggledevtools",
            label: i18nextMainBackend.t("Toggle Developer Tools")
          },
          {
            type: "separator"
          },
          {
            role: "resetzoom",
            label: i18nextMainBackend.t("Reset Zoom")
          },
          {
            role: "zoomin",
            label: i18nextMainBackend.t("Zoom In")
          },
          {
            role: "zoomout",
            label: i18nextMainBackend.t("Zoom Out")
          },
          {
            type: "separator"
          },
          {
            role: "togglefullscreen",
            label: i18nextMainBackend.t("Toggle Fullscreen")
          }
        ]
      },
      // language menu
      {
        label: i18nextMainBackend.t("Language"),
        submenu: whitelist.buildSubmenu(i18nBackend.changeLanguageRequest, i18nextMainBackend)
      },
      // { role: "windowMenu" }
      {
        label: i18nextMainBackend.t("Window"),
        submenu: [
          {
            role: "minimize",
            label: i18nextMainBackend.t("Minimize")
          },
          {
            role: "zoom",
            label: i18nextMainBackend.t("Zoom")
          },
          ...(isMac
            ? [
                {
                  type: "separator"
                },
                {
                  role: "front",
                  label: i18nextMainBackend.t("Front")
                },
                {
                  type: "separator"
                },
                {
                  role: "window",
                  label: i18nextMainBackend.t("Window")
                }
              ]
            : [
                {
                  role: "close",
                  label: i18nextMainBackend.t("Close")
                }
              ])
        ]
      },
      {
        role: "help",
        label: i18nextMainBackend.t("Help"),
        submenu: [
          {
            label: i18nextMainBackend.t("Learn More"),
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
    buildMenu: function(i18nextMainBackend) {
      const menu = Menu.buildFromTemplate(defaultTemplate(i18nextMainBackend));
      Menu.setApplicationMenu(menu);

      return menu;
    }
  };
};

module.exports = MenuBuilder;
