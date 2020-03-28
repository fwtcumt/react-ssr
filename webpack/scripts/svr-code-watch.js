// 对服务端代码进行监控编译
// 为什么不能像客户端代码编译那么简单呢，是因为在编译完服务端代码后，需要重启node服务

const webpack  = require('webpack');
const config =  require('../webpack.server.config');
const constantCode = require('./constant');

// 设置编译模式
config.mode='development';

//编译对象
const compiler = webpack(config);

const watching = compiler.watch({
  aggregateTimeout: 300, // 重新构建延迟时间，单位：毫秒
  ignored: /node_modules/, // 不需要监听的目录
  poll: 2000, // 轮训检查时间，单位：毫秒
}, (err, stats) => {
  const json = stats.toJson("minimal");
  const errs = json.errors || json.warnings;

  if (errs) {
    errs.forEach(item => {
      console.log(item);
    });
  }

  //编译完成后，输出这个常量。通知 服务端代码构建服务进程 来重启node服务
  console.log(constantCode.SVRCODECOMPLETED);
});

compiler.hooks.done.tap('done',function (data) {
  console.log('===服务端代码编译完成===');
});

//收到退出信号 退出自身进程
process.stdin.on('data', function (data) {
  if (data.toString() === 'exit') {
    process.exit();
  }
});
