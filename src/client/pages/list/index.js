import React from 'react';
import { Helmet } from 'react-helmet';

import tempData from './data';
import './index.less';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.initialData || props.staticContext && props.staticContext.initialData || {};
  }

  // 双端协定的数据预取方法
  static async getInitialProps() {
    // 模拟数据请求的方法
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 0,
            data: tempData
          });
        }, 100);
      });
    }

    const res = await fetchData();

    return {
      fetchData: res
    };
  }

  componentDidMount(){

    if(!this.state.fetchData){
      //如果没有数据，则进行数据请求
      List.getInitialProps().then(res => {
        this.setState(res);
      });
    }
  }

  handleClick = () => {
    alert('一起来玩ssr呀');
  }

  render() {
    const { data } = this.state.fetchData || {};

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

export default List;