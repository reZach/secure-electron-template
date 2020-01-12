# Scripts
This page is specific to the scripts in the package.json file; what they do and why we have them.

## Running locally
To run the template locally, we have 2 main scripts we can run: `npm run dev` or `npm run dev-slim`. There is one difference between these scripts; you should run `npm run dev-slim` if your app does **not need** electron, and run `npm run dev` if your app **needs** electron. Most cases, you will be safe simply running `npm run dev` but for any advanced users that do not need to test out features of electron they can opt for the `npm run dev-slim` command.

`npm run dev-slim` opens up your application in a web-browser; `npm run dev` runs electron around your application.

> _**NOTE**_ - when running locally, if you ever close the electron window, your dev server will continue to run. You must ctrl + c (or platform equivalent) to shut the dev server down to re-run `npm run dev` or `npm run dev-slim`. I am open to a PR that will make this process easier.

## Running production
You can test your production builds with the `npm run prod` command, this will load your application with electron and the production config of webpack. It is the production build that is used when packaging your application (below).

## Packaging your application
You can package up your application using any of the following commands:
```
npm run dist-mac
npm run dist-linux
npm run dist-windows
npm run dist-all
```

These commands make use of [electron-builder](https://www.electron.build) to build your app for production.