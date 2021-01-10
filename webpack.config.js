const webpack = require('webpack');
const path = require('path');

const config = {
  entry: ['babel-polyfill', path.resolve(__dirname, 'assets/js/webpack.js')],
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'easy-flow.min.js',
    libraryTarget: "var",
    library: "EasyFlow"
  },
  module: {
    rules:[
      {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the `node_modules folder`
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                  "@babel/preset-env"
              ],
              plugins: [
                  "@babel/plugin-proposal-class-properties"
              ]
            }
          },
        ]
      }
    ]
  }
};

module.exports = config;