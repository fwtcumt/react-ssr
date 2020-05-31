// 服务端入口

import Koa from 'koa2';
import koaStatic from 'koa-static';
import ssr from './middlewares/ssr';

const app = new Koa();

//静态资源 中间件
app.use(koaStatic('./dist/static'));

//ssr 中间件
app.use(ssr);

//启动服务
app.listen(9001);

console.log('\n 😊node服务启动啦：', `http://localhost:9001`);