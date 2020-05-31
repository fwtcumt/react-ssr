//完成react ssr工作的中间件，组件在服务端渲染的逻辑都在这个文件内

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from "react-redux";
import StyleContext from 'isomorphic-style-loader/StyleContext';
import routeList from '../../client/router/route-config';
import App from '../../client/router/index';
import matchRoute from '../../share/match-route';
import getStore from '../../share/get-store';
import getStaticRoutes from '../utils/get-static-routes';

// 导入资源处理库
const getAssets = require('../utils/get-assets');

// node层接口缓存
const fetchChache = {};

export default async (ctx, next) => {

  const path = ctx.request.path;

  // 获得静态路由
  const staticRoutesList = await getStaticRoutes(routeList);
  
  // 查找到的目标路由对象
  let targetRoute = await matchRoute(path, staticRoutesList);

  const store = getStore();

  // 服务端请求数据
  const onEnter = targetRoute && targetRoute.component.onEnter;
  
  if (onEnter) {
    const cacheData = fetchChache[path]?.data;
    const cacheTime = fetchChache[path]?.time;
    // 缓存30秒
    if (cacheTime && Date.now() - cacheTime <= 30000) {
      await onEnter({ store, cacheData });
    } else {
      const res = await onEnter({ store });
      fetchChache[path] = { data: res, time: Date.now() };
    };
  }

  // 获得当前路由依赖的CSS，为了避免重复，使用Set
  const css = new Set();
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getContent()));

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={path}>
        <StyleContext.Provider value={{ insertCss }}>
          <App routeList={staticRoutesList} />
        </StyleContext.Provider>
      </StaticRouter>
    </Provider>
  );

  const styles = [];
  [...css].forEach(item => {
      const [ mid, content ] = item[0];
      styles.push(`<style id="${mid}">${content}</style>`)
  });

  // 静态资源
  const assetsMap = getAssets();

  // 组件的序列化数据
  const helmet = Helmet.renderStatic();

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${styles.join('')}
      </head>
      <body>
        <div id="root">${html}</div>
        <textarea id="ssrTextInitData" style="display:none;">${JSON.stringify(store.getState())}</textarea>
      </body>
      ${assetsMap.js.join('')}
    </html>
  `;
  
  await next();
}