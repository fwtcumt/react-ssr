//开发环境 node 服务启动入口

const proConfig = require('../../src/share/pro-config');

// node 服务端口
const nodeServerPort = proConfig.nodeServerPort;

// 检查端口是否被占用。若被占，杀掉占用端口的进程
require('./free-port')(nodeServerPort);

// 执行打包好的服务端入口文件
require('../../dist/server/app');
