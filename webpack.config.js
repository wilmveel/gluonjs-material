var path = require('path');
var webpack = require('webpack');

const Uglify = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    "MaterialButton": "./src/components/MaterialButton.js",
    "MaterialCard": "./src/components/MaterialCard.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: [{
          loader: "to-string-loader"
        }, {
          loader: "css-loader?-minimize",
          options: {
            minimize: true
          }
        }, {
          loader: "sass-loader",
          options: {
            includePaths: [path.join(__dirname, 'node_modules')]
          }
        }]
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
    extensions: [".js", ".scss"]
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
  devServer: {
    compress: true,
    publicPath: '/dist/'
  }
};