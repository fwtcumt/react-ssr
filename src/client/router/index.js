import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import withStyles from 'isomorphic-style-loader/withStyles';
import css from './index.less';

function App({ routeList }) {
  return (
    <Switch>
      {routeList.map(item => <Route key={item.path} {...item} />)}
    </Switch>
  );
}

export default hot(withStyles(css)(App));
