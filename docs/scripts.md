# Scripts
This page is specific to the scripts in the package.json file; what they do and why we have them.

#### Running locally
To run the template locally, run `npm run dev`.

When this command is run, it will make use of code within the **dev-scripts** folder. [See here](https://github.com/reZach/secure-electron-template/blob/master/docs/architecture.md#dev-scripts) if you'd like additional information.

#### Running production
You can test your production builds with the `npm run prod` command, this will load your application with electron and the production config of webpack. It is the production build that is used when packaging your application (below).

#### Running E2E tests
You can run E2E tests with the `npm run test` command.

#### Packaging your application
You can package up your application using any of the following commands:
```
npm run dist-mac
npm run dist-linux
npm run dist-windows
npm run dist-all
```

These commands make use of [electron-builder](https://www.electron.build) to build your app for production.

#### Generating translation files
Translations for multiple languages can be generated automatically without manual effort. To create translations, run `npm run translate`.
> Note - There are additional details/setup that must be done the first time in `app/electron/localization/translateMissing.js` before running the command successfully. There is also additional information in this file how the translation process works.

#### Audit your application
Thanks to [`@doyensec/electronegativity`](https://github.com/doyensec/electronegativity), we can audit that our application meets all of the secure practices as recommended by the Electron team. To run it, run `npm run audit-app`. 
> Note - there are limitations of AST/DOM parsing (which the package uses) to verify secure practices. Some results of the report are false positives (ie. `LIMIT_NAVIGATION_GLOBAL_CHECK` and `PERMISSION_REQUEST_HANDLER_GLOBAL_CHECK`).