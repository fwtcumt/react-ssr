import React from 'react';
import { Link } from 'react-router-dom';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to="/index">首页</Link>
        &nbsp;|&nbsp;
        <Link to="/list">列表页</Link>
        <hr />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Index;
