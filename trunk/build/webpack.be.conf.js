/****************************************************************************
 * @copyright Liu Zhao
 * @authors   Liu Zhao (liuzhaomax@163.com)
 * @date      2018-06-26 13:29:03
 * @version   v1.0.0
 * filename   webpack.be.conf.js
 * function   后端打包配置
 ***************************************************************************/

'use strict';

var webpack = require('webpack');
var path = require('path');

var externals = _externals();

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../bin/www'),
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  externals: externals,
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env','stage-2']
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};

function _externals() {
  var manifest = require('../package.json');
  var dependencies = manifest.dependencies;
  var externals = {};
  for (var p in dependencies) {
    externals[p] = 'commonjs ' + p;
  }
  return externals;
}