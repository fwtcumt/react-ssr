import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../router/index';
import routeList from '../router/route-config';
import matchRoute from '../../share/match-route';

function clientRender() {

  // 初始数据
  let initialData =JSON.parse( document.getElementById('ssrTextInitData').value);

  // 查找路由
  let route = matchRoute(document.location.pathname, routeList);

  //设置组件初始化数据 [关键点]
  if (route) {
    route.initialData = initialData;
  }

  //渲染 Index 组建到页面
  ReactDom.hydrate(
    <BrowserRouter>
      <App routeList={routeList} />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

clientRender();

// 只有在开发环境才启用热更新
if (process.env.NODE_ENV === 'development' &&  module.hot) {
  module.hot.accept();
}
