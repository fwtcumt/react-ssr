// 浏览器端页面结构渲染入口

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../router/index';
import routeList from '../router/route-config';
import matchRoute from '../../share/match-route';
import proConfig from '../../share/pro-config';
import './index.less';

function renderDom() {
  ReactDom.hydrate(
    <BrowserRouter>
      <App routeList={routeList} />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

function clientRender() {

  // 查找路由
  let matchResult = matchRoute(document.location.pathname, routeList);
  let { targetRoute } = matchResult;
  
  if (targetRoute) {
    // 等待异步脚本加载完成
    if (targetRoute.component[proConfig.asyncComponentKey]) {
      targetRoute.component().props.load().then(res => {
        // 把异步路由变成同步路由
        targetRoute.component = res.default;
        // 异步组件加载完成后再渲染页面
        renderDom();
      });
    } else {
      renderDom();
    }
  } else {
    renderDom();
  }
}

clientRender();

// 只有在开发环境才启用热更新
if (process.env.NODE_ENV === 'development' &&  module.hot) {
  module.hot.accept();
}
