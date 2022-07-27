const i18n = require("i18next");
const reactI18Next = require("react-i18next");
const i18nBackend = require("i18next-electron-fs-backend").default;
const whitelist = require("./whitelist");

// On Mac, the folder for resources isn't
// in the same directory as Linux/Windows;
// https://www.electron.build/configuration/contents#extrafiles
const isMac = window.api.i18nextElectronBackend.clientOptions.platform === "darwin";
const isDev = window.api.i18nextElectronBackend.clientOptions.environment === "development";
const prependPath = isMac && !isDev ? window.api.i18nextElectronBackend.clientOptions.resourcesPath : ".";

i18n
  .use(i18nBackend)
  .use(reactI18Next.initReactI18next)
  .init({
    backend: {
      loadPath: prependPath + "/app/localization/locales/{{lng}}/{{ns}}.json",
      addPath: prependPath + "/app/localization/locales/{{lng}}/{{ns}}.missing.json",
      contextBridgeApiKey: "api" // needs to match first parameter of contextBridge.exposeInMainWorld in preload file; defaults to "api"
    },
    debug: false,
    namespace: "translation",
    saveMissing: true,
    saveMissingTo: "current",
    lng: "en",
    fallbackLng: false, // set to false when generating translation files locally
    supportedLngs: whitelist.langs
  });

window.api.i18nextElectronBackend.onLanguageChange((args) => {
  i18n.changeLanguage(args.lng, (error, _t) => {
    if (error) {
      console.error(error);
    }
  });
});

module.exports = i18n;
