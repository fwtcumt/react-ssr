import React from 'react';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    alert('一起来玩 react ssr 呀！');
  }

  render() {
    return (
      <h1 onClick={this.handleClick}>
        点我一下试试
      </h1>
    );
  }
}

export default Index;
