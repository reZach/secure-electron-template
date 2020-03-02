const i18n = require("i18next").default;
const reactI18Next = require("react-i18next");
const i18nBackend = require("i18next-electron-fs-backend").default;
const whitelist = require("./whitelist");

i18n
  .use(i18nBackend)
  .use(reactI18Next.initReactI18next)
  .init({
    backend: {
      loadPath: "./app/localization/locales/{{lng}}/{{ns}}.json",
      addPath: "./app/localization/locales/{{lng}}/{{ns}}.missing.json",
      ipcRenderer: window.api.i18nextElectronBackend
    },
    debug: false,
    namespace: "translation",
    saveMissing: true,
    saveMissingTo: "current",
    lng: "en",
    fallbackLng: false, // set to false when generating translation files locally
    whitelist: whitelist.langs
  });

window.api.i18nextElectronBackend.onLanguageChange((args) => {
  i18n.changeLanguage(args.lng, (error, t) => {
    if (error) {
      console.error(error);
    }
  });
});

module.exports = i18n;
