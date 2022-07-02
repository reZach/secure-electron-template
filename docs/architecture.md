# Architecture
This template is laid out in order to maintain a clear separation-of-concerns (SoC) and composability in order for you to take the template in any way you need to build your app. At the root level we have a few folders:

```
app/
dev-scripts/
docs/
resources/
test/
```

#### app
Contains everything for your app. All of your js/css files will go here as well as the electron-specific code. You can go [here](https://github.com/reZach/secure-electron-template/blob/master/docs/app.md) to find more information about this directory.

#### dev-scripts
Due to limitations in running electron _after_ a webpack development server has been started [and successfully compiled], additional scripts that run the development Electron configuration are in this directory that ensure we only start our _development_ Electron configuration _after_ webpack has loaded completely.

#### docs
Houses documentation pages such as this one.

#### resources
Any resources your electron app needs in for building/distributing executables should go here - icons are a great example.

#### test
Contains [mocha](https://mochajs.org/) tests you may use for E2E (end-to-end) testing.

## configs
At the root level we also have some configuration files.

```
.babelrc
package.json
webpack configs
```

#### .babelrc
In the babel configuration file we've set up aliases in order for you to import files with a little less typing. More information can [be found here](https://www.npmjs.com/package/babel-plugin-module-resolver). There are also a few babel presets for ES2015 features and react (so that we can handle .jsx files).

#### package.json
Where all the NPM modules are stored, as well as build and package scripts. If you want more detail on these scripts, [head over here](https://github.com/reZach/secure-electron-template/blob/master/docs/scripts.md).

#### webpack[.config|.development|.production].js
These files hold the webpack config for the template. The base template, `webpack.config.js` is used for both environments (development and production) while the other two are used for their respective environment.