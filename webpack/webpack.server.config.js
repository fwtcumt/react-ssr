const path = require('path');
const nodeExternals = require('webpack-node-externals'); // node端会自动载入的模块

// 路径转换
const resolvePath = pathstr => path.resolve(__dirname, pathstr);

// 设置 babel 运行的环境变量
process.env.BABEL_ENV = 'node';

module.exports = {
  mode: 'node',
  entry: resolvePath('../src/server/app/index.js'), // 服务端入口文件
  output: {
    filename: 'app.js', // 打包后的文件名
    path: resolvePath('../dist/server') // 文件输出目录
  },
  externals: [nodeExternals()], // 端不需要打包的模块
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
};
