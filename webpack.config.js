const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'examples/src'),
  entry: {
    app: './app.js',
    app_CN: './app_CN.js',
    common: [
      'react-images-viewer'
    ]
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
        }]
      },
    ],
  },
  resolve: {
    alias: {
      'react-images-viewer': path.resolve(__dirname, 'src/ImgsViewer'),
    }
  },
  optimization: {
    splitChunks: {
      name: true,
      // filename: 'common.js',
      // minChunks: 2,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
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
    new MiniCssExtractPlugin({ filename: 'example.css', chunkFilename: 'example.css' }),
  ]
};
