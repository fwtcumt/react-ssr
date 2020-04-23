import React from 'react';
import { Helmet } from 'react-helmet';
import pic_moon from './images/moon.gif';
import css from './index.less';
import withStyles from 'isomorphic-style-loader/withStyles';

function Index() {
  return (
    <div>
      <Helmet>
        <title>首页啊</title>
        <meta name="description" content="首页描述" />
        <meta name="keywords" content="首页" />
      </Helmet>

      <h1>中国中央银行热更新好啦</h1>
      <img src={pic_moon} alt=""/>
    </div>
  );
}

export default withStyles(css)(Index);
