const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals'); // node端会自动载入的模块

// 构建前清理目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 路径转换
const resolvePath = pathstr => path.resolve(__dirname, pathstr);

// 设置 babel 运行的环境变量
process.env.BABEL_ENV = 'node';

//获取当前环境
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: resolvePath('../src/server/app/index.js'), // 服务端入口文件
  output: {
    filename: 'app.js', // 打包后的文件名
    path: resolvePath('../dist/server') // 文件输出目录
  },
  externals: [nodeExternals()], // 端不需要打包的模块
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
      '@dist': path.resolve(__dirname,'../dist')
    }
  }
};
