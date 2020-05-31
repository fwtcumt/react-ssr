const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals'); // node端会自动载入的模块，不需要打进包

// 构建前清理目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolvePath = pathstr => path.resolve(__dirname, pathstr);

// 设置 babel 运行的环境变量
process.env.BABEL_ENV = 'node';

// 当前环境
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: resolvePath('../src/server/index.js'),
  output: {
    filename: 'app.js',
    path: resolvePath('../dist/server')
  },
  externals: [nodeExternals()], // 指定node端不需要打包的模块
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
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
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
              name: isProd ? 'img/[name].[hash:8].[ext]' : 'img/[name].[ext]',
              publicPath: isProd ? '/' : 'http://localhost:9002'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      '__IS_PROD__': isProd,
      '__SERVER__': true
    })
  ],
  resolve: {
    alias: {
      '@dist': path.resolve(__dirname,'../dist'),
      "assets": resolvePath('../src/client/assets'),
      "components": resolvePath('../src/client/components'),
      "utils": resolvePath('../src/client/utils')
    }
  }
};
