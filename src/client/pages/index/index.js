import React from 'react';
import { Helmet } from 'react-helmet';
import pic_moon from './images/moon.gif';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>首页啊</title>
          <meta name="description" content="首页描述" />
          <meta name="keywords" content="首页" />
        </Helmet>

        <h1>中国中央银行</h1>
        <img src={pic_moon} alt=""/>
      </div>
    );
  }
}

export default Index;
