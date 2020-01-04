const merge = require("webpack-merge");
const base = require("./webpack.config");

module.exports = merge(base, {
  mode: "production",
  devtool: "nosources-source-map" //https://webpack.js.org/configuration/devtool/ && https://github.com/webpack/webpack/issues/5627#issuecomment-389492939
});