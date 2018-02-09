const path = require('path');
const webpack = require('webpack');

const Uglify = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    "MaterialButton": "./src/components/MaterialButton.js",
    "MaterialCard": "./src/components/card",
    "MaterialList": "./src/components/MaterialList.js",
    "MaterialIcon": "./src/components/MaterialIcon.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'ProcessCssMappings'
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules')]
            }
          }
        ]
      }
    ]
  },
  stats: {
    colors: true
  },
  resolve: {
    alias: {
      "@material$": '/node_modules/@material'
    },
    extensions: [".js", ".scss", ".css"]
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  devServer: {
    compress: true,
    publicPath: '/dist/'
  }
};