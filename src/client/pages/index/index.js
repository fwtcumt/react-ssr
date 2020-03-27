import React from 'react';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    alert('一起来玩 react ssr 呀0！');
  }

  render() {
    return (
      <h1 onClick={this.handleClick}>
        <div>中国中央银行</div>
      </h1>
    );
  }
}

export default Index;
