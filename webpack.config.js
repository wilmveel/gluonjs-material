const path = require('path');

const webpack = require('webpack');

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
    "MaterialFab": "./src/components/fab",
    "MaterialRipple": "@material/ripple",
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
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'node_modules/gluonjs/**'),
          path.resolve(__dirname, 'node_modules/gluonjs-docs/**'),
          path.resolve(__dirname, 'node_modules/lit-html/**')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [["env", {modules: false}]],
            plugins: ['transform-runtime'],
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