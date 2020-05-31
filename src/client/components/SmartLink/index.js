import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @param {string} href 表示使用a标签
 * @param {string} to 表示使用Link标签
 * @param {component} children 子元素
**/
export default ({ href, to, children, ...rest }) => {
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  }
  return <Link to={to} {...rest}>{children}</Link>;
}