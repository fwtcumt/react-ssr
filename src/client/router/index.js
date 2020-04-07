import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../app/layout';

function App({ routeList }) {
  return (
    <Layout>
      <Switch>
        {routeList.map(item => <Route key={item.path} {...item} />)}
      </Switch>  
    </Layout>
  );
}

export default App;
