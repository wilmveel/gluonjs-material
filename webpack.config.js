const path = require('path');
const webpack = require('webpack');

const Uglify = require("uglifyjs-webpack-plugin");

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    "DocsDemo": "./node_modules/gluonjs-docs/src/DocsDemo.js",
    "MaterialButton": "./src/components/button",
    "MaterialCard": "./src/components/card",
    "MaterialDialog": "./src/components/dialog",
    "MaterialDrawer": "./src/components/drawer",
    "MaterialIconToggle": "./src/components/icon-toggle",
    "MaterialToolbar": "./src/components/toolbar",
    "MaterialList": "./src/components/list",
    "MaterialTypography": "./src/components/typography",
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
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
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
  plugins: [
    // new Uglify()
  ],
  devServer: {
    compress: true,
    publicPath: '/dist/'
  }
};