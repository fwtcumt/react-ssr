//web服务启动入口文件
//这是一个中间件，用于处理web请求，实现ssr，将组建转换成html字符串

const reactSsr = require('./dist/src/server/middlewares/react-ssr').default;
const Koa = require('koa2');
const koaStatic = require('koa-static');
const path = require('path');

const app = new Koa();

//设置访问的静态资源，我们把webpack打包后的代码放到/dist/static目录下
app.use(koaStatic(path.join(__dirname, './dist/static')));

//react ssr中间件
app.use(reactSsr);

//启动服务
app.listen(9001);

console.log('server is start at: 9001');