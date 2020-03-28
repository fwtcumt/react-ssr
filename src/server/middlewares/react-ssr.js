//完成react ssr工作的中间件，组建在服务端渲染的逻辑都在这个文件内

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import routeList from '../../client/router/route-config';
import App from '../../client/router/index';


export default (ctx, next) => {

  const path = ctx.request.path; // 请求的 path

  const html = renderToString(
    <StaticRouter location={path}>
      <App routeList={routeList} />
    </StaticRouter>
  );
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>my react ssr</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      <script src="index.js"></script>
    </html>
  `;
  return next();
}