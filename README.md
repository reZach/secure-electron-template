# secure-electron-template
The best way to build Electron apps with security in mind.

> If you are curious about what makes an electron app secure, please check out [this page](https://github.com/reZach/secure-electron-template/blob/master/docs/secureapps.md).

![Picture of template](https://github.com/reZach/secure-electron-template/blob/master/docs/imgs/templatepic.png "Picture of template")

## Features
Taken from the [best-practices](https://electronjs.org/docs/tutorial/security) official page, here is what this repository offers!

1. [Only load secure content](https://electronjs.org/docs/tutorial/security#1-only-load-secure-content) - (Need help!)
2. [Do not enable node.js integration for remote content](https://electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content) - ✅
3. [Enable context isolation for remote content](https://electronjs.org/docs/tutorial/security#3-enable-context-isolation-for-remote-content) - ✅
4. [Handle session permission requests from remote content](https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content) - ✅
5. [Do not disable websecurity](https://electronjs.org/docs/tutorial/security#5-do-not-disable-websecurity) - ✅
6. [Define a content security policy](https://electronjs.org/docs/tutorial/security#6-define-a-content-security-policy) - ✅
7. [Do not set allowRunningInsecureContent to true](https://electronjs.org/docs/tutorial/security#7-do-not-set-allowrunninginsecurecontent-to-true) - ✅
8. [Do not enable experimental features](https://electronjs.org/docs/tutorial/security#8-do-not-enable-experimental-features) - ✅
9. [Do not use enableBlinkFeatures](https://electronjs.org/docs/tutorial/security#9-do-not-use-enableblinkfeatures) - ✅
10. [Do not use allowpopups](https://electronjs.org/docs/tutorial/security#10-do-not-use-allowpopups) - ✅
11. [&lt;webview&gt; verify options and params](https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation) - ✅
12. [Disable or limit navigation](https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation) - ✅
13. [Disable or limit creation of new windows](https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows) - ✅
14. [Do not use openExternal with untrusted content](https://electronjs.org/docs/tutorial/security#14-do-not-use-openexternal-with-untrusted-content) - ✅
15. [Disable remote module](https://electronjs.org/docs/tutorial/security#15-disable-the-remote-module) - ✅
16. [Filter the remote module](https://electronjs.org/docs/tutorial/security#16-filter-the-remote-module) - ✅
17. [Use a current version of electron](https://electronjs.org/docs/tutorial/security#17-use-a-current-version-of-electron) - ✅

## Included frameworks
Built-in to this template are a number of popular frameworks already wired up to get you on the road running.

- [Electron](https://electronjs.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/) (with [Redux toolkit](https://redux-toolkit.js.org/))
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.js.org/) (with [webpack-dev-server](https://github.com/webpack/webpack-dev-server))
- [i18next](https://www.i18next.com/) (with [this plugin](https://github.com/reZach/i18next-electron-fs-backend) for localization).
- [Store](https://github.com/reZach/secure-electron-store) (for saving config/data)
- [Electron builder](https://www.electron.build/) (for packaging up your app)
- [Easy redux undo](https://github.com/reZach/easy-redux-undo) (for undo/redoing your redux actions)


## Roadmap
There are a number of additions that I'd like to implement in this repository, namely [auto-updating](https://www.electron.build/auto-update) and more release-focused enhancements and test suites, but those are lower priority (but I welcome PRs!).

## Architecture
For a more detailed view of the architecture of the template, please check out [here](https://github.com/reZach/secure-electron-template/blob/master/docs/architecture.md). I would _highly_ recommend reading this document to get yourself familiarized with this template.

## How to get started
Click the ![Use this template](https://github.com/reZach/secure-electron-template/blob/master/docs/imgs/usethistemplate.png "Use this template") button to get started.

Alternatively, if you want to fork and contribute to the template, you can follow these commands:
```
git clone https://github.com/reZach/secure-electron-template.git
cd secure-electron-template
npm i
npm run dev
```

## FAQ
Please see [our faq](https://github.com/reZach/secure-electron-template/blob/master/docs/faq.md) for any common questions you might have.