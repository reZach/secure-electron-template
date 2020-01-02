const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const rules = require("./webpack.rules");

rules.push({
  test: /\.css$/,
  use: [{
    loader: "style-loader"
  }, {
    loader: "css-loader"
  }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
    new CspHtmlWebpackPlugin({
      "base-uri": ["'self'"],
      "object-src": ["'none'"],
      "script-src": ["'self'"],
      "style-src": ["'unsafe-inline'"],
      "frame-src": ["'none'"],
      "worker-src": ["'none'"]
    })
  ]
};