import React from 'react';
import RouteLoading from 'components/RouteLoading';

function AsyncLoader (loader) {
  class AsyncBundle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Mod: null
      }
    }
  
    componentDidMount() {
      if (!this.state.Mod) {
        loader().then(res => {
          this.setState({ Mod: res.default });
        });
      }
    }
  
    render() {
      const { Mod } = this.state;

      return Mod ? <Mod {...this.props} /> : <RouteLoading />;
    }
  }

  // 标记为异步组件
  AsyncBundle.isAsync = true;
  AsyncBundle.loader = loader;

  return AsyncBundle;
}

export default AsyncLoader;
