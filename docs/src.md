# Src
Here's what the template looks like on a fresh install:
```
components/
constants/
core/
pages/
redux/
index.html
index.jsx
```

#### components
This folder holds reusable react components you may use in your application. This folder is different than the **pages** folder in that a page represents a container that would hold one to many components.

> Think of a component as something _smaller_ than a page, like a reusable module or the like.

#### constants
Constant values that your app might need. All this folder has is a dictionary of keys/routes necessary for [react-router](https://github.com/ReactTraining/react-router) to work. If you were to add another page, this would be one file you'd have to modify.

#### core
Contains the "bones" that sets up redux as well as your routes. You'll also need to modify the routes file in this folder if you add another page in your app.

#### pages
Contains pages in your application. Think of a page as a distinct screen. If you had a multi-screen app, you'd need many pages.

#### redux
Contains all redux-specific files, such as slices, reducers and your redux store.

#### index.html
This file is the _template_ for your application. With some webpack plugins that are setup for the application, this file will be transformed into bundled .html file that your application will render. The bundled .html file lives in `./app/dist/`.

When building the application for production, this file gets the [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) tag added it to load resources over a non-file:/// origin because [it is more secure](https://github.com/reZach/secure-electron-template/issues/2). Otherwise, the differences between production and non-production are identical.

#### index.jsx
The [entry point](https://webpack.js.org/concepts/entry-points/) of your application where webpack generates your application bundle code from. You likely won't need to touch this file at all, but it's important to know what it's there for.