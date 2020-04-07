import React from 'react';
import { Helmet } from 'react-helmet';
import AsyncLoader from './async-loader';

function PageNotFound() {
  return (
    <div>
      <Helmet>
        <title>404</title>
        <meta name="description" content="404" />
        <meta name="keywords" content="404" />
      </Helmet>
      
      <div>404页面!</div>
    </div>
  );
}

export default [
  {
    path: ['/', '/index'],
    component: AsyncLoader(() => import(/*webpackChunkName:"chunk-index"*/'../pages/index')),
    exact: true
  },
  {
    path: '/list',
    component: AsyncLoader(() => import(/*webpackChunkName:"chunk-list"*/'../pages/list')),
    exact: true
  },
  {
    path: '*',
    component: PageNotFound,
    exact: true
  }
];
