import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Link } from 'react-router-dom';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to="/index">首页</Link>
        &nbsp;|&nbsp;
        <Link to="/list">列表页</Link>
        &nbsp;|&nbsp;
        <Link to="/404">404</Link>
        <hr />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default hot(Layout);
