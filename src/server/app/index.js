import Koa from 'koa2';
import koaStatic from 'koa-static';
import reactSsr from '../middlewares/react-ssr';
import proConfig from '../../share/pro-config.js';

const port = proConfig.nodeServerPort || process.env.PORT;

const app = new Koa();


//设置可访问的静态资源
app.use(koaStatic('./dist/static'));


//ssr 中间件
app.use(reactSsr);

//启动服务
app.listen(port);

console.log('node服务启动啦：', `http://localhost:${port}`);