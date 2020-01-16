import i18n from "i18next";
import {
  initReactI18next
} from "react-i18next";
import i18nBackend from "i18next-electron-fs-backend";

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "./app/localization/locales/{{lng}}/{{ns}}.json",
      addPath: "./app/localization/locales/{{lng}}/{{ns}}.missing.json",
      ipcRenderer: window.api.i18nextElectronBackend
    },
    debug: true,
    namespace: "translation",
    saveMissing: true,
    saveMissingTo: "current",
    lng: "en",
    fallbackLng: "en", // set to false when generating translation files locally
    whitelist: ["en"]
  });

export default i18n;