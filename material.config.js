const path = require('path');

const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    "MaterialRipple": "@material/ripple",
  },
  output: {
    path: path.resolve(__dirname, 'src/material'),
    filename: "[name].js",
    library: 'MyCoolApp',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [["env", {modules: false}]],
            runtimeHelpers: true
          }
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
    // new UglifyJsPlugin({
    //   test: /\.js($|\?)/i,
    //   parallel: true,
    //   uglifyOptions: {
    //     toplevel: true,
    //     compress: {passes: 2},
    //     mangle: false,
    //     output: {
    //       comments: false
    //     }
    //   }
    //
    // })
  ],
  devServer: {
    compress: true,
    publicPath: '/dist/'
  }
};