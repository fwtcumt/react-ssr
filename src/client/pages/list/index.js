import React from 'react';

import tempData from './data';

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
        }, 500);
      });
    }

    const res = await fetchData();
    return res;
  }

  componentDidMount(){
    if(!this.state.data){
      //如果没有数据，则进行数据请求
      List.getInitialProps().then(res => {
        this.setState({
          data:res.data || []
        });
      });
    }
  }

  handleClick = () => {
    alert('一起来玩ssr呀');
  }

  render() {
    const { code, data } = this.state || {};

    return (
      <div>
        {!data && <div>暂无数据</div>}
        {data && data.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default List;