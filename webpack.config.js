const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'examples/src'),
  entry: {
    app: './app.js',
    app_CN: './app_CN.js',
  },
  output: {
    path: path.resolve(__dirname, 'examples/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples/src'),
    host: '0.0.0.0',
    port: 8001,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'env', 'stage-2'] },
        }],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
        }]
      },
    ],
  },
  resolve: {
    alias: {
      'react-images-viewer': path.resolve(__dirname, 'src/ImgsViewer'),
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunk: 2,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'examples/src/index.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'index_CN.html',
      inject: false,
      template: path.resolve(__dirname, 'examples/src/index_CN.html')
    }),
    new ExtractTextPlugin('example.css'),
  ]
};
