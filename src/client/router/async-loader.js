import React from 'react';
import Loading from './loading';
import proConfig from '../../share/pro-config';

class AsyncBundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: this.mod || null
    }
  }

  componentDidMount() {
    if (!this.state.mod) {
      this.load();
    }
  }

  load = () => {
    this.setState({ mod: null });
    this.props.load().then(mod => {
      this.setState({ mod: mod.default || mod });
    });
  }

  render() {
    const { mod } = this.state;
    return mod ? this.props.children(mod) : <Loading />;
  }
}

function AsyncLoader (loader) {

  function AsyncFn(props) {
    return (
      <AsyncBundle load={loader}>
        {(Comp) => <Comp {...props} />}
      </AsyncBundle>
    );
  }

  // 标记为异步组件
  AsyncFn[proConfig.asyncComponentKey] = true;

  return AsyncFn;
}

export default AsyncLoader;
