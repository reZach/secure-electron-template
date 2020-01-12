# Building a secure app
What makes an app secure? Generally this means to follow the principle of **least privilege**, that is, to only give you the bare minimum necessary privileges necessary. This means your app should not request administrator access if it doesn't need it, and unnecessary libraries should [not be included if not used](https://martinfowler.com/bliki/Yagni.html).

Before electron v5, this concept wasn't followed as closely as it probably should have been. Electron apps designed pre-v5 were built like this: 

![Pre-v5 electron apps](https://github.com/reZach/secure-electron-template/blob/master/docs/imgs/pre-v5.png "Electron apps before version 5")

The bridge between the renderer and main components were the remote module and nodeIntegration. Node integration is what makes electron so powerful, but also [very vulnerable to hacking](https://snyk.io/vuln/npm:electron). Tightly integrating the node modules in the renderer (or interactible/visible parts of your app) expose you to RCE and XSS, to name a few problems.

[Beginning with version 5](https://electronjs.org/docs/api/breaking-changes#planned-breaking-api-changes-50), electron by default is turning off these unsafe options and preferring more safe ones by default. The communication that happens between the renderer and main process is decoupled, and more secure:

![v5+ electron apps](https://github.com/reZach/secure-electron-template/blob/master/docs/imgs/post-v5.png "Electron apps beginning with version 5")

IPC (inter-process communication) is used to send messages between processes, and the preload script can inject modules or behavior that the renderer process can then use. This separation of concern gives us the ability to practice **the principle of least priviledge**.

The trouble that I've found with electron, is that their [release schedule is crazy](https://electronjs.org/docs/tutorial/electron-timelines), with only a few months before each major release. We know that electron is a young framework, but it is hard to keep up so quickly!

What's even more troubling is many of the frameworks that work with electron are still built using these old/insecure (pre v5) patterns in mind. If you want to be secure that means you might have to begin re-writing some of them. 

As of today, the electron framework _mostly_ supports IPC between renderer and main processes but in the middle of rewriting an [i18next](https://github.com/reZach/i18next-electron-fs-backend) and [store](https://github.com/reZach/secure-electron-store) plugin for this repository to work with IPC - I've discovered a [bug](https://github.com/electron/electron/issues/21437) in electron that prevents us from listening to messages from the main process inside the renderer process. It's unfortunately blocking all progress in creating post-v5 secure libraries, (but maybe a [bounty on the issue](https://www.bountysource.com/issues/85135915-ipcrenderer-does-not-execute-normally-in-preload-js) will motivate you?). 

Regardless, electron has come a great deal of the way to secure apps and we have almost crossed the finish line!