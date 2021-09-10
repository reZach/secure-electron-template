const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  target: "web", // Our app can run without electron
  entry: ["./app/src/index.jsx"], // The entry point of our app; these entry points can be named and we can also have multiple if we'd like to split the webpack bundle into smaller files to improve script loading speed between multiple pages of our app
  output: {
    path: path.resolve(__dirname, "app/dist"), // Where all the output files get dropped after webpack is done with them
    filename: "bundle.js" // The name of the webpack bundle that's generated
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  },
  module: {
    rules: [{
        // loads .html files
        test: /\.(html)$/,
        include: [path.resolve(__dirname, "app/src")],
        use: {
          loader: "html-loader",
          options: {
            sources: {
              "list": [{
                "tag": "img",
                "attribute": "data-src",
                "type": "src"
              }]
            }
          }
        }
      },
      // loads .js/jsx files
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "app/src")],
        loader: "babel-loader",
        resolve: {
          extensions: [".js", ".jsx", ".json"]
        }
      },
      // loads .css files
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "app/src"),
          path.resolve(__dirname, "node_modules/"),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
        resolve: {
          extensions: [".css"]
        }
      },
      // loads common image formats
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        type: "asset/inline"
      }
    ]
  },
  plugins: [
    // fix "process is not defined" error;
    // https://stackoverflow.com/a/64553486/1837080
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
    new CleanWebpackPlugin()
  ]
};