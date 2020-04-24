import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles'

export default ({ css, mapStateToProps, mapDispatchToProps }, ActiveComponet) => {
  return withStyles(css)(connect(mapStateToProps, mapDispatchToProps)(ActiveComponet));
}