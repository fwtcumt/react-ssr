import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const req = require.context('../pages', true, /route\.jsx?$/);
const allRoutes = [].concat.apply([], req.keys().map(k => req(k).default || []));

function PageNotFound() {
  return (
    <div>
      <Helmet>
        <title>404</title>
        <meta name="description" content="404" />
        <meta name="keywords" content="404" />
      </Helmet>

      <p>你访问的页面突然就消失了，怎么办呢？</p>
      <Link to="/">返回首页</Link>
    </div>
  );
}

allRoutes.push({
  path: '*',
  component: PageNotFound,
  exact: true
});


export default allRoutes;
