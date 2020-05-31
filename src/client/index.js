// 客户端入口

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from './router/index';
import routeList from './router/route-config';
import matchRoute from '../share/match-route';
import getStore from '../share/get-store';

function renderDom() {

  const insertCss = (...styles) => {
    // 客户端执行，插入style
    const removeCss = styles.map(style => style._insertCss());
    // 组件卸载时，移除style
    return () => removeCss.forEach(dispose => dispose());
  }

  const store = getStore(window.__INITIAL_DATA__);
  window.__STORE__ = store;

  ReactDom.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <StyleContext.Provider value={{ insertCss }}>
          <App routeList={routeList} />
        </StyleContext.Provider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}

function clientRender() {

  // 拿出服务端传来的数据
  window.__INITIAL_DATA__ = JSON.parse(document.getElementById('ssrTextInitData').value);

  // 查找路由
  const targetRoute = matchRoute(document.location.pathname, routeList);
  
  if (targetRoute && targetRoute.component.isAsync) {
    targetRoute.component.loader().then(res => {
      // 把异步路由变成同步路由
      targetRoute.component = res.default;
      renderDom();
    });
  } else {
    renderDom();
  }
}

clientRender();
