const path = require('path');

//定一个通用的路径转换方法
const resolvePath = pathstr => path.resolve(__dirname, pathstr);

module.exports = {
  mode: 'development',
  entry: resolvePath('../src/client/app/index.js'), //客户端入口文件
  output: {
    filename: 'index.js', //打包后的文件名
    path: resolvePath('../dist/static') //文件输出目录
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
};
