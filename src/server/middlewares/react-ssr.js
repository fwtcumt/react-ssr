//完成react ssr工作的中间件，组建在服务端渲染的逻辑都在这个文件内

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import routeList from '../../client/router/route-config';
import matchRoute from '../../share/match-route';
import App from '../../client/router/index';

export default async (ctx, next) => {

  const path = ctx.request.path; // 请求的 path

  //查找到的目标路由对象
  let targetRoute = matchRoute(path, routeList);

  let fetchResult = {};
  if(targetRoute && targetRoute.component && targetRoute.component.getInitialProps){
    //数据预取 -> fetchResult
    const fetchDataFn = targetRoute.component.getInitialProps;
    fetchResult = await fetchDataFn();
  }

  //将预取数据在这里传递过去 组内通过props.staticContext获取
  const context = {
    initialData: fetchResult
  };

  const html = renderToString(
    <StaticRouter location={path} context={context}>
      <App routeList={routeList} />
    </StaticRouter>
  );

  // 为了防止 xss 攻击，咱们这里将数据放到了textarea标签内

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>my react ssr</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <textarea id="ssrTextInitData" style="display:none;">${JSON.stringify(fetchResult)}</textarea>
      </body>
      <script src="index.js"></script>
    </html>
  `;
  
  next();
}