const { spawn } = require('child_process');
const chalk = require('chalk');
const constantCode = require('./constant');

console.log(chalk.green('===启动监控服务==='));

//客户端代码构建服务进程
const feCodeWatchProcess = spawn(process.platform === 'win32' ? 'yarn.cmd' : 'yarn', ['fe:watch'],{stdio:'inherit'});

//服务端代码构建服务进程
const svrCodeWatchProcess = spawn(process.platform === 'win32' ? 'yarn.cmd' : 'yarn', ['svr:watch']);

//node 服务进程
let nodeServerProcess = null;

//启动(重启) node 服务
const startNodeServer = () => {
  nodeServerProcess && nodeServerProcess.kill();
  nodeServerProcess = spawn('node', ['./webpack/scripts/svr-dev-server.js']);
  nodeServerProcess.stdout.on('data', print);
}

//控制台输出信息
function print(data) {
  let str = data.toString();
  if (str.indexOf(constantCode.SVRCODECOMPLETED) > -1) { //接收到服务端代码编译完成的通知
    startNodeServer();
  } else {
    console.log(str);
  }
}

//监听服务端代码构建服务的对外输出  stdout 事件
svrCodeWatchProcess.stdout.on('data', print);

//杀掉子进程
const killChild=()=>{
  svrCodeWatchProcess && svrCodeWatchProcess.kill();
  nodeServerProcess && nodeServerProcess.kill();
  feCodeWatchProcess && feCodeWatchProcess.kill();
}

//主进程关闭时退出子进程
process.on('close', (code) => {
  console.log(chalk.yellow('主进程关闭：'), code);
  killChild();
});

//主进程关闭时退出子进程
process.on('exit', (code) => {
  console.log(chalk.yellow('主进程关闭：'), code);
  killChild();
});

//非正常退出情况
process.on('SIGINT', function () {
  svrCodeWatchProcess.stdin.write('exit', (error) => {
    console.log(chalk.yellow('服务端代码监控进程关闭'));
  });
  killChild();
});

