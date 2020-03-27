//完成react ssr工作的中间件，组建在服务端渲染的逻辑都在这个文件内

import React from 'react';
import Index from '../../client/pages/index';
import { renderToString } from 'react-dom/server';

export default (ctx, next) => {
  const html = renderToString(<Index />);
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