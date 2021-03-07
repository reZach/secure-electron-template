const fs = require("fs");
const {
  readdirSync,
  statSync
} = require("fs");
const {
  join
} = require("path")
const {
  Translate
} = require("@google-cloud/translate").v2;

// READ THIS NOTICE
/*
  In order to run this file, you must do the following steps:

  1. Select or create a Cloud Platform project
  2. Enable billing for your project
  3. Enable the Cloud Translation API
  4. Set up authentication with a service account [so you can access the API from your local workstation]
  (These steps are found with more details here: https://www.npmjs.com/package/@google-cloud/translate)

  Once this is done, update 'projectId' below with your GCP project id, and remove the return statement below this comment.

  ----

  BASIC WORKFLOW

  In order to use this file effectively, which is run with the command 'npm run translate', you would
  create translated strings like in menu.js or localization.jsx. You would then run the app and change
  languages in order that the keys for these translated strings are populated in the various other 
  languages' missing.json files. Once this is done for all languages you'd like to create translations for, you may run `npm run translate` in order that the missing translation files be translated with
  the Google Translate API.

  Note - it is important that 'fromLanguage' be updated to the language that the keys are in the various
  translation[.missing].json files. It is this variable that's used by Google to determine the source 
  language from which to translate.
*/
console.log("The translateMissing.js file must be updated before it can be ran.");
return;

const projectId = "YOUR_PROJECT_ID";

// Instantiates a client
const translate = new Translate({
  projectId
});

async function updateTranslations() {

  try {
    const root = "./app/localization/locales";
    const fromLanguage = "en";
    
    // Get valid languages from Google Translate API
    let [googleLanguages] = await translate.getLanguages(); // ie. { code: "en", name: "English" }
    googleLanguages = googleLanguages.map(gl => gl.code.replace("-", "_"))

    // Uncomment me to view the various languages Google can translate to/from
    //console.log(googleLanguages);

    // Get all language directories;
    // https://stackoverflow.com/a/35759360/1837080
    const getDirectories = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());
    const languageDirectories = getDirectories(root).filter(d => googleLanguages.includes(d));    

    // For each language, read in any missing translations
    // and translate
    for (let i = 0; i < languageDirectories.length; i++) {

      // Check to make sure each language has the proper files
      try {
        const languageRoot = `${root}/${languageDirectories[i]}`;
        const translationFile = `${languageRoot}/translation.json`;
        const missingTranslationFile = `${languageRoot}/translation.missing.json`;

        const translationExists = fs.existsSync(translationFile);
        const translationMissingExists = fs.existsSync(missingTranslationFile);

        if (translationExists && translationMissingExists) {

          // Read in contents of files
          let translations = JSON.parse(fs.readFileSync(translationFile, {
            encoding: "utf8"
          }));
          const missing = JSON.parse(fs.readFileSync(missingTranslationFile, {
            encoding: "utf8"
          }));

          // Only translate files with actual values
          const missingKeys = Object.keys(missing);        
          if (missingKeys.length > 0){

            // Translate each of the missing keys to the target language
            for (let j = 0; j < missingKeys.length; j++){
              const googleTranslation = await translate.translate(missingKeys[j], {
                from: fromLanguage,
                to: languageDirectories[i]
              });

              // Only set if a value is returned
              if (googleTranslation.length > 0){
                translations[missingKeys[j]] = googleTranslation[0];
              }              
            }
  
            // Write output back to file
            fs.writeFileSync(translationFile, JSON.stringify(translations, null, 2));
            fs.writeFileSync(missingTranslationFile, JSON.stringify({}, null, 2));
  
            console.log(`Successfully updated translations for ${languageDirectories[i]}`);
          } else {
            console.log(`Skipped creating translations for ${languageDirectories[i]}; none found!`);
          }          
        } else {

          // Log if we failed
          if (!translationExists) {
            console.error(`Could not generate translations for language '${languageDirectories[i]}' because ${translationFile} does not exist, skipping!`);
          } else if (!translationMissingExists) {
            console.error(`Could not generate translations for language '${languageDirectories[i]}' because ${missingTranslationFile} does not exist, skipping!`);
          }
        }
      } catch (error) {
        console.error("Failed due to fatal error");
        console.error(error);
      }
    }
  } catch (e) {
    console.error("Failed due to fatal error");
    console.error(error);
  }
}

updateTranslations();