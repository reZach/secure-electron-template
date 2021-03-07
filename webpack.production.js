const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const base = require("./webpack.config");
const path = require("path");

module.exports = merge(base, {
  mode: "production",
  devtool: "nosources-source-map", //https://webpack.js.org/configuration/devtool/ && https://github.com/webpack/webpack/issues/5627#issuecomment-389492939
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/src/index.html"),
      filename: "index.html",
      base: "app://rse"
    }),
    // You can paste your CSP in this website https://csp-evaluator.withgoogle.com/
    // for it to give you suggestions on how strong your CSP is
    new CspHtmlWebpackPlugin(
      {
        "base-uri": ["'self'"],
        "object-src": ["'none'"],
        "script-src": ["'self'"],
        "style-src": ["'self'"],
        "frame-src": ["'none'"],
        "worker-src": ["'none'"]
      },
      {
        hashEnabled: {
          "style-src": false
        }
      }
    )
  ]
});
