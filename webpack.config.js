const path = require('path');
const webpack = require('webpack');

const Uglify = require("uglifyjs-webpack-plugin");
const WatchFile = require("watchfile-webpack-plugin");

const FileWatcherPlugin = require("file-watcher-webpack-plugin");

module.exports = {
  entry: {
    "MaterialButton": "./src/components/MaterialButton.js",
    "MaterialCard": "./src/components/MaterialCard.js",
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
  // devtool: 'source-map',
  // plugins: [
  //   new Uglify({
  //     uglifyOptions:{
  //       output: {
  //         comments: false, // remove comments
  //       }
  //     },
  //   })
  // ]

  plugins: [
    new FileWatcherPlugin({
      root: path.resolve(__dirname, 'src/mappings'),
      files: ['*.yml']
    })
  ],
  devServer: {
    compress: true,
    publicPath: '/dist/'
  }
};