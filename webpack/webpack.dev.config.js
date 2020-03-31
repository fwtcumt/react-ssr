const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolvePath = pathstr => path.resolve(__dirname, pathstr);

// 指定babel编译环境
process.env.BABEL_ENV ='development';

module.exports = {
  mode: 'development',
  entry: {
    main: ['react-hot-loader/patch', resolvePath('../src/client/app/index.js')]
  },
  output: {
    filename: '[name].js',
    path: resolvePath('../dist/static'),
    publicPath: 'http://localhost:9002/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      '__IS_PROD__': false,
      '__SERVER__': false
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'libs'
        }
      }
    }
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};
