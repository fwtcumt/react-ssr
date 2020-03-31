// 非Windows系统释放指定端口

module.exports = function (port) {
  if (process.platform && process.platform !== 'win32') {

    const args = process.argv.slice(2);
    const portArg = args && args[0];

    if (portArg && portArg.indexOf('--') > 0) {
      port = portArg.split('--')[1];
		}
		
    const order = `lsof -i :${port}`;
		const exec = require('child_process').exec;
		
    exec(order, (err, stdout) => {
			if (err) {
				return console.log('检查指定端口失败！！');
			}
			stdout.split('\n').filter(line => {
				let p = line.trim().split(/\s+/);
				let address = p[1];
				if (address != undefined && address != "PID") {
					exec('kill -9 ' + address, (err) => {
						if (err) {
							return console.log('释放指定端口失败！！');
						}
						console.log('已结束占用进程');
					});
				}
			});
    });
  }
}
