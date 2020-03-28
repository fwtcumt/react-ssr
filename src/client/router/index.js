import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../app/layout';
import Page404 from '../pages/page404';

function App({ routeList }) {
  return (
    <Layout>
      <Switch>
        {routeList.map(item => {
          if (item.initialData) {
            return (
              <Route
                key={item.path}
                path={item.path}
                exact={item.exact}
                render={props => {
                  props.initialData = item.initialData;
                  return <item.component {...props} />;
                }}
              />
            );
          }
          return <Route key={item.path} {...item} />;
        })}
        <Route to="*" component={Page404} />
      </Switch>  
    </Layout>
  );
}

export default App;
