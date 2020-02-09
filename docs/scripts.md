# Scripts
This page is specific to the scripts in the package.json file; what they do and why we have them.

#### Running locally
To run the template locally, run `npm run dev`.

#### Running production
You can test your production builds with the `npm run prod` command, this will load your application with electron and the production config of webpack. It is the production build that is used when packaging your application (below).

#### Packaging your application
You can package up your application using any of the following commands:
```
npm run dist-mac
npm run dist-linux
npm run dist-windows
npm run dist-all
```

These commands make use of [electron-builder](https://www.electron.build) to build your app for production.