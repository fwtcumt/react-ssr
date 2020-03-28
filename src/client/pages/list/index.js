import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  ttt = '一起来玩ssr呀';

  handleClick = () => {
    alert(this.ttt);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        这个才是真的
      </div>
    );
  }
}

export default List;