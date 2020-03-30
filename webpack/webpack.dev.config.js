const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolvePath = pathstr => path.resolve(__dirname, pathstr);

module.exports = {
  mode: 'development',
  entry: {
    main: resolvePath('../src/client/app/index.js')
  },
  output: {
    filename: '[name].js',
    path: resolvePath('../dist/static')
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(less|css)$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        { loader: 'css-loader' },
        { loader: 'postcss-loader' },
        { loader: 'less-loader' }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
    filename: '[name].css'
  })]
};
