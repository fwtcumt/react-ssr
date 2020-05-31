import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles'

/**
 * @description 强化后的connect
 * @param {object} opt redux连接配置，包含三个属性 css、mapStateToProps、mapDispatchToProps
 * @param {component} ConnectedComponent 被redux连接的组件
*/
export default ({ css, mapStateToProps, mapDispatchToProps }, ConnectedComponent) => {
  return withStyles(css)(connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent));
}