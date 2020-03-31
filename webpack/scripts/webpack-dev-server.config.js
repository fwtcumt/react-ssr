// webpack dev server配置文件

const path = require('path');

module.exports = function(port, publicPath) {
  return {
    quiet: true,
    port: port,
    contentBase: path.resolve(__dirname, '../../dist/static'),
    publicPath: publicPath,
    hot: true,
    progress: true,
    open: false,
    compress: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 500, // 延迟时间，毫秒
      poll: 500 // 轮训时间，毫秒
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
}
