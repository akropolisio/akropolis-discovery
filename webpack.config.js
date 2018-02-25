const webpack = require("webpack");
const path = require("path");
const www = path.resolve(__dirname, "www");
const tmp = path.resolve(__dirname, ".tmp");

module.exports = {
  entry: "./src/dapp/dapp.js",
  output: {
    filename: "bundle.js",
    path: tmp
  },
  module: {
    rules: [],
    loaders: [
      {
        test: /\.json$/,
        use: "json-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devServer: {
    contentBase: www
  }
};