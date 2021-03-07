/*
  Reasonably Secure Electron
  Copyright (C) 2019  Bishop Fox
  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU General Public License
  as published by the Free Software Foundation; either version 2
  of the License, or (at your option) any later version.
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
-------------------------------------------------------------------------
Implementing a custom protocol achieves two goals:
  1) Allows us to use ES6 modules/targets for Angular
  2) Avoids running the app in a file:// origin
*/

const fs = require("fs");
const path = require("path");

const DIST_PATH = path.join(__dirname, "../../app/dist");
const scheme = "app";

const mimeTypes = {
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".html": "text/html",
  ".htm": "text/html",
  ".json": "application/json",
  ".css": "text/css",
  ".svg": "application/svg+xml",
  ".ico": "image/vnd.microsoft.icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".map": "text/plain"
};

function charset(mimeType) {
  return [".html", ".htm", ".js", ".mjs"].some((m) => m === mimeType)
    ? "utf-8"
    : null;
}

function mime(filename) {
  const type = mimeTypes[path.extname(`${filename || ""}`).toLowerCase()];
  return type ? type : null;
}

function requestHandler(req, next) {
  const reqUrl = new URL(req.url);
  let reqPath = path.normalize(reqUrl.pathname);
  if (reqPath === "/") {
    reqPath = "/index.html";
  }
  const reqFilename = path.basename(reqPath);
  fs.readFile(path.join(DIST_PATH, reqPath), (err, data) => {
    const mimeType = mime(reqFilename);
    if (!err && mimeType !== null) {
      next({
        mimeType: mimeType,
        charset: charset(mimeType),
        data: data
      });
    } else {
      console.error(err);
    }
  });
}

module.exports = {
  scheme,
  requestHandler
};
