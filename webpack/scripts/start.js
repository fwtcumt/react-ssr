const { spawn } = require('child_process');

console.log('\n 🤔启动双端代码监控服务...');

//客户端代码构建服务进程
const feCodeWatchProcess = spawn(process.platform === 'win32' ? 'yarn.cmd' : 'yarn', ['wds:watch'], { stdio: 'inherit' });

//服务端代码构建服务进程
const svrCodeWatchProcess = spawn(process.platform === 'win32' ? 'yarn.cmd' : 'yarn', ['svr:watch']);

//node 服务进程
let nodeServerProcess = null;

//启动(重启) node 服务
const startNodeServer = () => {
  nodeServerProcess && nodeServerProcess.kill();
  nodeServerProcess = spawn('node', ['./dist/server/app.js']);
  nodeServerProcess.stdout.on('data', print);
}

//控制台输出信息
function print(data) {
  let str = data.toString();
  if (str.indexOf('SVRCODECOMPLETED') > -1) { // 接收到服务端代码编译完成的通知
    startNodeServer();
  } else {
    console.log('\n' + str);
  }
}

//监听服务端代码构建服务的对外输出 stdout 事件
svrCodeWatchProcess.stdout.on('data', print);

//杀掉子进程
const killChild=()=>{
  svrCodeWatchProcess && svrCodeWatchProcess.kill();
  nodeServerProcess && nodeServerProcess.kill();
  feCodeWatchProcess && feCodeWatchProcess.kill();
}

//主进程关闭时退出子进程
process.on('close', (code) => {
  console.log('\n 😠主进程关闭：', code);
  killChild();
});

//主进程关闭时退出子进程
process.on('exit', (code) => {
  console.log('\n 😠主进程关闭：', code);
  killChild();
});

//非正常退出情况
process.on('SIGINT', function () {
  svrCodeWatchProcess.stdin.write('exit', (error) => {
    console.log('\n 😠服务端代码监控进程关闭');
  });
  killChild();
});

