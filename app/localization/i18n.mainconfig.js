const i18n = require("i18next");
const backend = require("i18next-fs-backend");
const whitelist = require("./whitelist");

i18n
  .use(backend)
  .init({
    backend: {
      loadPath: "./app/localization/locales/{{lng}}/{{ns}}.json",
      addPath: "./app/localization/locales/{{lng}}/{{ns}}.missing.json"
    },
    debug: false,
    namespace: "translation",
    saveMissing: true,
    saveMissingTo: "current",
    lng: "en",
    fallbackLng: false, // set to false when generating translation files locally
    whitelist: whitelist.langs
  });

module.exports = i18n;