// 打开默认浏览器

var opn = require('opn');

module.exports = function(url) {
  //默认谷歌 有需要请自行修改
  //opn(url, {app: 'firefox'});
  opn(url).catch(err => { console.log(err); });
}
