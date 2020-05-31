import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import loading_pic from 'assets/loading.gif';
import css from './index.less';

/**
 * @param {string} msg 提示信息
**/
const RouteLoading = ({ msg }) => {
  return (
    <div className="mask-accets-loading">
      <div className="inner-box">
        <img className="img-loading" src={loading_pic} alt=""/>
        <div className="msg-loading">{msg}</div>
      </div>
    </div>
  );
};

export default withStyles(css)(RouteLoading);
