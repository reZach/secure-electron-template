const merge = require("webpack-merge");
const base = require("./webpack.config");
const path = require("path");

module.exports = merge(base, {
  mode: "development",
  devtool: "source-map", // Show the source map so we can debug when developing locally
  devServer: {
    host: "localhost",
    port: "40992",
    hot: true, // Hot-reload this server if changes are detected
    compress: true, // Compress (gzip) files that are served
    contentBase: path.resolve(__dirname, "app/dist"), // Where we serve the local dev server's files from
    watchContentBase: true, // Watch the content base for changes
    watchOptions: {
      ignored: /node_modules/ // Ignore this path, probably not needed since we define contentBase above
    }
  }
})