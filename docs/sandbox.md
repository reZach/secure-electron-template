# Sandbox

Whenever you're deploying your application, whether in a packaged form or running it from the command line, it's worth verifying that electron renderer is actually running in sandboxed mode.

This document currently explains how the procedure to check if the sandbox is enabled for the following operating systems:
- Linux (seccomp-bpf) (todo: namespace sandbox)
- OSX

Not supported:
- Windows

If you however do know a way of testing those too, then please update this document with the information.

A good _indication_ that the sanbox _might_ be enabled is that the `--no-sandbox` is nowhere to be found. 

## linux: verify seccomp-bpf sandbox

Run the application you want to test.
This can be from the actual source code or even a packaged distributable (.zip, .deb, snap..).

We need to get a list of the process ids (PIDs for short).
```
$ ps aux | grep "electron"
```

Only the renderer processes are supposed to be sandboxed, so grab the PIDs of the processes which have the --renderer flag
```
user     22350  0.0  0.0   4340   772 pts/0    S+   21:50   0:00 sh -c electron --enable-sandbox .
user     22351  1.3  0.4 742836 24072 pts/0    Sl+  21:50   0:00 node /home/user/projects/electron/electron-sandbox/sandbox-preload-simple/node_modules/.bin/electron --enable-sandbox .
user     22357  8.6  1.7 1147784 91584 pts/0   Sl+  21:50   0:00 /somepath/electron --enable-sandbox .
user     22360  0.0  0.5 323788 29296 pts/0    S+   21:50   0:00 /somepath/electron --type=zygote
user     22362  0.0  0.1 323788  8400 pts/0    S+   21:50   0:00 /somepath/electron --type=zygote
user     22394  2.0  1.2 717784 67312 pts/0    Sl+  21:50   0:00 /somepath/electron --type=renderer --primordial-pipe-token=61D5BD0CAC441B2B2628002A0299952A --lang=en-US --enable-sandbox --app-path=/home/user/projects/electron/electron-sandbox/sandbox-preload-simple --node-integration=false --webview-tag=false --enable-sandbox --preload=/home/user/projects/electron/electron-sandbox/sandbox-preload-simple/preload-simple.js --context-isolation --enable-pinch --num-raster-threads=4 --enable-main-frame-before-activation --content-image-texture-target=... --renderer-client-id=4 --shared-files=v8_natives_data:100,v8_snapshot_data:101
user     22407  0.0  0.0  12728  2096 pts/1    S+   21:50   0:00 grep electron
```
We make sure that the `--no-sandbox` flag is NOWHERE to be found. If you see a --no-sandbox in a renderer, then it will not be sandboxed.

We grab the PID of the renderer process, which is `22394` in this particular instance.

We check if the Seccomp BPF sandbox is running with the following command

```
$ cat /proc/22394/status | grep "Seccomp"
Seccomp:	2
```

If it returns 2 the it means the sandbox is enabled!
```
0 //  SECCOMP_MODE_DISABLED
1 //  SECCOMP_MODE_STRICT
2 //  SECCOMP_MODE_FILTER
```

## MacOS: verify sandbox
* Launch Activity Monitor (available in `/Applications/Utilities`).
* In Activity Monitor, choose View > Columns.
* Ensure that the Sandbox menu item is checked.
* In the Sandbox column, confirm that the value for the Quick Start app is Yes.
* To make it easier to locate the app in Activity monitor, enter the name of the Quick Start app in the Filter field.

src: https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxQuickStart/AppSandboxQuickStart.html#//apple_ref/doc/uid/TP40011183-CH2-SW3
