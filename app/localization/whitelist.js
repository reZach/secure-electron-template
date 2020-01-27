// Contains a whitelist of languages for our app
const whitelistMap = {
  af: "Afrikaans",
  ar: "عربى", // Arabic
  am: "አማርኛ", // Amharic
  bg: "български", // Bulgarian
  ca: "Català", // Catalan
  cs: "čeština", // Czech
  da: "dansk", // Danish
  de: "Deutsche", // German
  el: "Ελληνικά", // Greek
  en: "English",
  es: "Español", // Spanish
  et: "Eestlane", // Estonian
  fa: "فارسی", // Persian
  fi: "Suomalainen", // Finnish
  fil: "Pilipino", // Filipino
  fr: "Français", // French
  gu: "ગુજરાતી", // Gujarati
  he: "עברית", // Hebrew
  hi: "हिंदी", // Hindi
  hr: "Hrvatski", // Croatian
  hu: "Magyar", // Hungarian
  id: "Indonesia", // Indonesian
  it: "Italiano", // Italian
  ja: "日本語", // Japanese
  kn: "ಕನ್ನಡ", // Kannada
  ko: "한국어", // Korean
  lt: "Lietuvis", // Lithuanian
  lv: "Latvietis", // Latvian
  ml: "മലയാളം", // Malayalam
  mr: "मराठी", // Marathi
  ms: "Melayu", // Malay
  nl: "Nederlands", // Dutch
  no: "norsk", // Norwegian
  pl: "Polskie", // Polish
  pt_BR: "Português", // Portuguese
  ro: "Română", // Romanian
  ru: "русский", // Russian
  sk: "slovenský", // Slovak
  sr: "Српски", // Serbian
  sv: "svenska", // Swedish
  sw: "Kiswahili", // Swahili
  ta: "தமிழ்", // Tamil
  te: "తెలుగు", // Telugu
  th: "ไทย", // Thai
  tr: "Türk", // Turkish
  uk: "Українська", // Ukranian
  vi: "Tiếng Việt", // Vietnamese
  zh_CN: "越南文" // Chinese
};

var Whitelist = (function() {
  let keys = Object.keys(whitelistMap);
  let clickFunction = function(channel, lng) {
    return function(menuItem, browserWindow, event) {
      browserWindow.webContents.send(channel, {
        lng
      });
    };
  };

  return {
    langs: keys,
    buildSubmenu: function(channel) {
      let submenu = [];

      for (var i = 0; i < keys.length; i++) {
        submenu.push({
          label: whitelistMap[keys[i]],
          click: clickFunction(channel, keys[i])
        });
      }

      return submenu;
    }
  };
})();

module.exports = Whitelist;
