const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ]
      }
    ]
  }
});
