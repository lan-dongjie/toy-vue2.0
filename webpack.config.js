
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, './', dir);
}


module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
    {
      test:/\.js$/,
      exclude:/node_modules/,
      loaders:"babel-loader",
    }
  ]},
  plugins: [
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
}