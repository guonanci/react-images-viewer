const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: path.resolve(__dirname, 'examples/src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'examples/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples/src'),
    host: '0.0.0.0',
    port: 8000,
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
        }],
      },
    ],
  },
  resolve: {
    alias: {
      'react-images-viewer': path.resolve(__dirname, 'src/ImgsViewer'),
      utils: path.resolve(__dirname, 'src/utils'),
    }
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      name: 'common',
      minChunks: 2,
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      template: path.resolve(__dirname, 'examples/src/index.html')
    })
  ]
}
