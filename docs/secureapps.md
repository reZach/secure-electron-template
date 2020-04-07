# Building a secure app
What makes an app secure? Generally this means to follow the principle of **least privilege**, that is, to only give you the bare minimum necessary privileges necessary. This means your app should not request administrator access if it doesn't need it, and unnecessary libraries should [not be included if not used](https://martinfowler.com/bliki/Yagni.html).

Before electron v5, this concept wasn't followed as closely as it probably should have been. Electron apps designed pre-v5 were built like this: 

![Pre-v5 electron apps](https://github.com/reZach/secure-electron-template/blob/master/docs/imgs/pre-v5.png "Electron apps before version 5")

The bridge between the renderer and main components were the remote module and nodeIntegration. Node integration is what makes electron so powerful, but also [very vulnerable to hacking](https://snyk.io/vuln/npm:electron). Tightly integrating the node modules in the renderer (or interactible/visible parts of your app) expose you to RCE and XSS, to name a few problems.

[Beginning with version 5](https://electronjs.org/docs/api/breaking-changes#planned-breaking-api-changes-50), electron by default is turning off these unsafe options and preferring more safe ones by default. The communication that happens between the renderer and main process is decoupled, and more secure:

![v5+ electron apps](https://github.com/reZach/secure-electron-template/blob/master/docs/imgs/post-v5.png "Electron apps beginning with version 5")

IPC (inter-process communication) can be used to exchange messages between processes, and the preload script can extend the capabilites of the renderer process (e.g: inject modules from the main processes). This separation of concern gives us the ability to apply **the principle of least privilege**.

My personal experience with electron, is that their [release schedule is crazy](https://electronjs.org/docs/tutorial/electron-timelines), with only a few months between each major release. Electron is a relatively young framework, but it's under very active development which makes it hard to keep up with! This quick release cadence is in part in place to keep [bugs fixed sooner than later](https://electronjs.org/docs/tutorial/security#17-use-a-current-version-of-electron). While it's good for security, it can sometimes be tedious for developers to keep up to date with the framework.

What's even more troubling is many of the frameworks that integrate with electron are still applying these old/insecure (pre v5) patterns. If you wish to be more secure then you might have to rewrite some of them. 

There is a little bit more work required to use IPC, but I'm working on it! Regardless, electron developers have worked hard to enable application developers to write more secure apps!
