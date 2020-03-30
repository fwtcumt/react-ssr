import React from 'react';
import { Helmet } from 'react-helmet';

class Page404 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>404</title>
          <meta name="description" content="404描述" />
          <meta name="keywords" content="404" />
        </Helmet>

        <h1>擦，没有东西 404</h1>
      </div>
    );
  }
}

export default Page404;
