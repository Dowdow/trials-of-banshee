const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const config = {
  entry: {
    index: path.resolve(__dirname, './assets/js/index.jsx'),
    // '../sw': path.resolve(__dirname, './assets/js/service-worker.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name: '[name].[contenthash].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new WebpackAssetsManifest({
      publicPath: '/build/',
    }),
  ],
};

module.exports = (env, argv) => {
  config.devtool = argv.mode === 'development' ? 'eval-source-map' : false;
  return config;
};
