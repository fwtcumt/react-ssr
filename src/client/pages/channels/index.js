import React from 'react';
import { Helmet } from 'react-helmet';
import isoConnect from 'utils/ios-connect';
import css from './index.less';
import { getPageData, setSyncState } from './redux.js';


class Channel extends React.Component {

  // 只在服务端触发一次
  static  onEnter({ store, cacheData }) {
    return store.dispatch(getPageData(cacheData));
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 服务端请求失败或没有走服务端时，客户端发起请求
    if (this.props.channelList.length === 0) {
      this.props.getPageData();
    }
  }

  handleGoBack = () => {
    this.props.history.goBack();
  }

  handleSwitchChannel = (id, include) => {
    const { channelList } = this.props;
    const newChannelList = channelList.map(item => {
      return { ...item, include: item.id === id ? include : item.include };
    });

    this.props.setSyncState({
      channelList: newChannelList
    });
  }

  render() {
    const { channelList } = this.props;
    const includeChannels = channelList.filter(v => v.include);
    const excludeChannels = channelList.filter(v => !v.include);

    return (
      <div className="page-root page-channel">
        <Helmet>
          <title>列表页</title>
          <meta name="description" content="列表描述" />
          <meta name="keywords" content="列表 来来来" />
        </Helmet>
        
        <header className="header">
          频道管理
          <span className="back" onClick={this.handleGoBack} />
        </header>
        <div className="channel-title">点击删除以下频道</div>
        <div className="channel-list">
          {includeChannels.map(item => (
            <div key={item.id} className="item">
              <span
                className={item.id === 1 ? 'channel disabled' : 'channel'}
                onClick={item.id === 1 ? null : () => this.handleSwitchChannel(item.id, false)}
              >{item.name}</span>
            </div>
          ))}
        </div>
        <div className="channel-title">点击添加以下频道</div>
        <div className="channel-list">
          {excludeChannels.map(item => (
            <div key={item.id} className="item">
              <span
                className="channel"
                onClick={() => this.handleSwitchChannel(item.id, true)}
              >{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {...state.channelsPage};
};

const mapDispatchToProps = {
  getPageData,
  setSyncState
};

export default isoConnect({
  css,
  mapStateToProps,
  mapDispatchToProps
}, Channel);