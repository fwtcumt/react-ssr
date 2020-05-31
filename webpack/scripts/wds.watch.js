// 启动wds服务

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');

// 编译次数
let compilationTime = 0;

// webapck配置
const clientConfig = require('../webpack.dev.config');

// wds配置
const getWdsConfig = require('./wds.config');

// 创建 wds 服务
function createWdsServer() {

  // 创建webpack打包器
  const compiler = webpack(clientConfig);

  compiler.hooks.done.tap('done', function () {
    if (compilationTime === 0){
      // 第一次编译完成的时，自动打开浏览器。默认谷歌，有需要请自行修改
      //opn(url, { app: 'firefox' });
      opn(`http://localhost:9001/`).catch(err => { console.log(err); });
    }
    compilationTime += 1;
  });

  return new WebpackDevServer(compiler, getWdsConfig(9002, clientConfig.output.publicPath));
}

// 启动WebpackDevServer.
const devServer = createWdsServer();
devServer.listen(9002, 'localhost', err => {
  if (err) {
    return console.log(err);
  }
  console.log('\n 🤔启动开发服务...');
});
