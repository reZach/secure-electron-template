const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const path = require("path");

module.exports = {
  target: "web",
  entry: ["./app/src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "app/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [{
        test: /\.(html)$/,
        include: [
          path.resolve(__dirname, "app/src")
        ],
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"]
          }
        }
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app/src")
        ],
        loader: "babel-loader",
        resolve: {
          extensions: [".js", ".jsx", ".json"]
        }
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "app/src")
        ],
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ],
        resolve: {
          extensions: [".css"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/src/index.html"
    }),
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
    new CspHtmlWebpackPlugin({
      "base-uri": ["'self'"],
      "object-src": ["'none'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"],
      "frame-src": ["'none'"],
      "worker-src": ["'none'"]
    })
  ]
}