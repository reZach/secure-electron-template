const merge = require("webpack-merge");
const base = require("./webpack.config");
const path = require("path");

module.exports = merge(base, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    host: "localhost",
    port: "40992",
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, "app/dist"),
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
})