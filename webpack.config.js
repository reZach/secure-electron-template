const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const path = require("path");

module.exports = {
  target: "web", // Our app can run without electron
  entry: ["./app/src/index.jsx"], // The entry point of our app; these entry points can be named and we can also have multiple if we'd like to split the webpack bundle into smaller files to improve script loading speed between multiple pages of our app
  output: {
    path: path.resolve(__dirname, "app/dist"), // Where all the output files get dropped after webpack is done with them
    filename: "bundle.js", // The name of the webpack bundle that's generated
  },
  module: {
    rules: [{
      // loads .html files
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
      // loads .js/jsx files
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
      // loads .css files
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