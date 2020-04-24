import React from 'react';
import { Helmet } from 'react-helmet';
import tempData from './data';
import css from './index.less';

import { getInitialData } from './redux/index';
import isoConnect from '../../common/ios-connect';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  //数据预取方法 用于服务端调用 参数内可以获得store 
  static async  getInitialProps({ store }) {
    //通过 dispach 获得数据,同时也会更新store
    return store.dispatch(getInitialData());
  }

  componentDidMount() {
    if (!this.props.initialData.fetchData.data) {
      this.props.getInitialData();
    }
  }

  handleClick = () => {
    alert('一起来玩ssr呀');
  }

  render() {
    //渲染数据 这里不变
    const { fetchData } = this.props.initialData;
    const { code, data } = fetchData || {};

    return (
      <div className="list-page">
        <Helmet>
          <title>列表页</title>
          <meta name="description" content="列表描述" />
          <meta name="keywords" content="列表 来来来" />
        </Helmet>

        {!data && <div>暂无数据</div>}

        {data && data.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
        <button className="btn" onClick={this.handleClick}>点我一下啊</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialData: state.listPage,
});

const mapDispatchToProps = {
  getInitialData
};

export default isoConnect({
  css,
  mapStateToProps,
  mapDispatchToProps
}, List);