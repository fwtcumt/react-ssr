// 启动wds服务

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const freePort = require('./free-port');
const open = require('./open-browser');
const proConfig = require('../../src/share/pro-config');

let compilationTime = 0; // 编译次数
const WDS_PORT = proConfig.wdsPort; // wds服务端口
const NODE_SERVER_PORT = proConfig.nodeServerPort; // node服务端口
const HOST = 'localhost';

// 释放wds端口
freePort(WDS_PORT);

// webapck配置
const clientConfig = require('../webpack.dev.config');

// 获取wds配置
const getWdsConfig = require('./webpack-dev-server.config');

// 创建webpack打包器
function getWebPackCompiler() {
  return webpack(clientConfig);
}

// 创建 wds 服务
function createWdsServer(port) {

  let compiler = getWebPackCompiler();

  compiler.hooks.done.tap('done', function () {
      //第一次编译完成的时，自动打开浏览器
      if (compilationTime===0){
        open(`http://localhost:${NODE_SERVER_PORT}/`);
      }
      compilationTime += 1;
  });

  return new WebpackDevServer(compiler, getWdsConfig(port, clientConfig.output.publicPath));
}

// 启动WebpackDevServer.
function runWdsServer() {

  let devServer = createWdsServer(WDS_PORT);

  devServer.listen(WDS_PORT, HOST, err => {
    if (err) {
      return console.log(err);
    }
    console.log('\n 正在启动开发服务.... \n');
  });
}

runWdsServer();
