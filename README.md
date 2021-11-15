# secure-electron-template
A current electron app template with the most popular frameworks, designed and built with security in mind. (If you are curious about what makes an electron app secure, please check out [this page](https://github.com/reZach/secure-electron-template/blob/master/docs/secureapps.md)).

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=reZach_secure-electron-template&metric=alert_status)](https://sonarcloud.io/dashboard?id=reZach_secure-electron-template)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=reZach_secure-electron-template&metric=security_rating)](https://sonarcloud.io/dashboard?id=reZach_secure-electron-template)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=reZach_secure-electron-template&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=reZach_secure-electron-template)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=reZach_secure-electron-template&metric=bugs)](https://sonarcloud.io/dashboard?id=reZach_secure-electron-template)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=reZach_secure-electron-template&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=reZach_secure-electron-template)

## How to get started
To get started, clone the repository by clicking the ![Use this template](https://github.com/reZach/secure-electron-template/blob/master/docs/imgs/usethistemplate.png "Use this template") button, or through the command line (`git clone https://github.com/reZach/secure-electron-template.git`). 

Once cloned, install the dependencies for the repo by running the following commands (you do _not_ have to run the first command if your command line is already inside the newly cloned respository):

```
cd secure-electron-template
npm i
npm run dev
```

> Are you using `yarn`? You'll want to [read this issue](https://github.com/reZach/secure-electron-template/issues/62).

When you'd like to test your app in production, or package it for distribution, please navigate to [this page](https://github.com/reZach/secure-electron-template/blob/master/docs/scripts.md) for more details on how to do this.

## Demo
![Demo](https://github.com/reZach/secure-electron-template/blob/master/docs/imgs/intro.gif "Demo")

## Features
Taken from the [best-practices](https://electronjs.org/docs/tutorial/security) official page, here is what this repository offers!

1. [Only load secure content](https://www.electronjs.org/docs/latest/tutorial/security#1-only-load-secure-content) - ✅ (But the developer is responsible for loading secure assets only 🙂)
2. [Do not enable node.js integration for remote content](https://www.electronjs.org/docs/latest/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content) - ✅
3. [Enable context isolation for remote content](https://www.electronjs.org/docs/latest/tutorial/security#3-enable-context-isolation-for-remote-content) - ✅
4. [Enable sandboxing](https://www.electronjs.org/docs/latest/tutorial/security#4-enable-sandboxing) - [consider this document](https://github.com/reZach/secure-electron-template/blob/master/docs/sandbox.md)
5. [Handle session permission requests from remote content](https://www.electronjs.org/docs/latest/tutorial/security#5-handle-session-permission-requests-from-remote-content) - ✅
6. [Do not disable websecurity](https://www.electronjs.org/docs/latest/tutorial/security#6-do-not-disable-websecurity) - ✅
7. [Define a content security policy](https://www.electronjs.org/docs/latest/tutorial/security#7-define-a-content-security-policy) - ✅
8. [Do not set allowRunningInsecureContent to true](https://www.electronjs.org/docs/latest/tutorial/security#8-do-not-set-allowrunninginsecurecontent-to-true) - ✅
9. [Do not enable experimental features](https://www.electronjs.org/docs/latest/tutorial/security#9-do-not-enable-experimental-features) - ✅
10. [Do not use enableBlinkFeatures](https://www.electronjs.org/docs/latest/tutorial/security#10-do-not-use-enableblinkfeatures) - ✅
11. [Do not use allowpopups](https://www.electronjs.org/docs/latest/tutorial/security#11-do-not-use-allowpopups) - ✅
12. [&lt;webview&gt; verify options and params](https://www.electronjs.org/docs/latest/tutorial/security#12-verify-webview-options-before-creation) - ✅
13. [Disable or limit navigation](https://www.electronjs.org/docs/latest/tutorial/security#13-disable-or-limit-navigation) - ✅
14. [Disable or limit creation of new windows](https://www.electronjs.org/docs/latest/tutorial/security#14-disable-or-limit-creation-of-new-windows) - ✅
15. [Do not use openExternal with untrusted content](https://www.electronjs.org/docs/latest/tutorial/security#15-do-not-use-openexternal-with-untrusted-content) - ✅
16. [Use a current version of electron](https://www.electronjs.org/docs/latest/tutorial/security#16-use-a-current-version-of-electron) - ✅

[comment]: <> (TODO <NewEXE> What to do with this legacy ones?)
[comment]: <> (15. [Disable remote module]&#40;https://electronjs.org/docs/tutorial/security#15-disable-the-remote-module&#41; - ✅)
[comment]: <> (16. [Filter the remote module]&#40;https://electronjs.org/docs/tutorial/security#16-filter-the-remote-module&#41; - ✅)

## Included frameworks
Built-in to this template are a number of popular frameworks already wired up to get you on the road running.

- [Electron](https://electronjs.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/) (with [Redux toolkit](https://redux-toolkit.js.org/))
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/) (with [webpack-dev-server](https://github.com/webpack/webpack-dev-server))
- [Electron builder](https://www.electron.build/) (for packaging up your app)
- [Mocha](https://mochajs.org/)

## Bonus modules
What would a template be without some helpful additions?

- [i18next](https://www.i18next.com/) (with [this plugin](https://github.com/reZach/i18next-electron-fs-backend) for localization).
- [Store](https://github.com/reZach/secure-electron-store) (for saving config/data)
- [Context menu](https://github.com/reZach/secure-electron-context-menu) (supports custom context menus)
- [Easy redux undo](https://github.com/reZach/easy-redux-undo) (for undo/redoing your redux actions)
- [License key validation](https://github.com/reZach/secure-electron-license-keys) (for validating a user has the proper license to use your app) **new!**

## Architecture
For a more detailed view of the architecture of the template, please check out [here](https://github.com/reZach/secure-electron-template/blob/master/docs/architecture.md). I would _highly_ recommend reading this document to get yourself familiarized with this template.

## FAQ
Please see [our faq](https://github.com/reZach/secure-electron-template/blob/master/docs/faq.md) for any common questions you might have.
**NEW TO ELECTRON?** Please visit [this page](https://github.com/reZach/secure-electron-template/blob/master/docs/newtoelectron.md).

## Show us your apps!
If you've built any applications with our template, we'd [love to see them!](https://github.com/reZach/secure-electron-template/blob/master/docs/yourapps.md).
