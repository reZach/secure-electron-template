import i18n from "i18next";
import {
  initReactI18next
} from "react-i18next";
import i18nBackend from "i18next-node-fs-backend";

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "./app/localization/locales/{{lng}}/{{ns}}.json",
      addPath: "./app/localization/locales/{{lng}}/{{ns}}.missing.json",
      jsonIndent: 2
    },
    debug: true,
    namespace: "translation",
    saveMissing: true,
    saveMissingTo: "current",
    fallbackLng: "en", // set to false when generating translation files locally
  });

export default i18n;

// if (!i18n.isInitialized) {
//   i18n.use(i18nextBackend).init(i18nextOptions).then(function () {
//     i18n.changeLanguage(config.fallbackLng, (err) => {
//       if (err) {
//         return console.log("couldn't change language");
//       }
//     });
//     return true;
//   }).catch(function (err) {
//     console.error(err);
//   });
// }