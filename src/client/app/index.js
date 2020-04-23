// 浏览器端页面结构渲染入口

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from '../router/index';
import routeList from '../router/route-config';
import matchRoute from '../../share/match-route';
import proConfig from '../../share/pro-config';

function renderDom() {
  const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss()); // 客户端执行，插入style
    return () => removeCss.forEach(dispose => dispose()); // 组件卸载时 移除当前的 style 标签
  }

  ReactDom.hydrate(
    <BrowserRouter>
      <StyleContext.Provider value={{ insertCss }}>
        <App routeList={routeList} />
      </StyleContext.Provider>
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
      targetRoute.component.loader().then(res => {
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
