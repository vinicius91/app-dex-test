const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: { app: './src/app.js' },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './output/dist'
  }
});
