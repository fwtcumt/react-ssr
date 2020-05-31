import React from 'react';
import { Helmet } from 'react-helmet';
import isoConnect from 'utils/ios-connect';
import css from './index.less';
import { getPageData, setSyncState } from './redux.js';

import Modal from 'components/Modal';
import FeedFlow from 'components/FeedFlow';
import Header from './components/header.js';
import Navbar from './components/navbar.js';

class Home extends React.Component {

  // 只在服务端触发一次
  static onEnter({ store, cacheData }) {
    return store.dispatch(getPageData(cacheData));
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      success: false
    }
  }

  componentDidMount() {
    // 服务端请求失败或没有走服务端时，客户端发起请求
    if (this.props.homeFlowList.length === 0) {
      this.props.getPageData();
    } else {
      this.setFeedListScroll();
    }
  }

  // 保存信息流滚动的位置
  saveFeedListScroll = () => {
    this.props.setSyncState({
      homeFlowListScrollTop: this.feedListDom.scrollTop
    });
  }

  // 设置信息流滚动的位置
  setFeedListScroll = () => {
    const { homeFlowListScrollTop } = this.props;
    if (homeFlowListScrollTop) this.feedListDom.scrollTop = homeFlowListScrollTop;
  }

  // mock loading
  getRecFlow = () => {
    this.setState({ loading: true });
    this.recTimer1 = setTimeout(() => {
      this.setState({ loading: false, success: true });
      this.recTimer2 = setTimeout(() => {
        this.setState({ success: false });
      }, 2000);
    }, 1000);
  }

  // 切换频道
  handleChangeNav = (type) => {
    this.props.setSyncState({
      homeNavType: type
    });
    this.feedListDom.scrollTop = 0;
    this.getRecFlow();
  }

  // 关注作者
  handleFeedFriend = (idx, isFriend) => {
    const { homeFlowList } = this.props;
    homeFlowList[idx].author.friend = !isFriend;
    this.props.setSyncState({
      homeFlowList: [...homeFlowList]
    });
  }

  // 移除广告
  handleFeedRemove = (idx) => {
    Modal.confirm({
      content: '优质广告，您确定要屏蔽么？屏蔽后，将永不再为您推荐',
      onOk: () => {
        const { homeFlowList } = this.props;
        homeFlowList.splice(idx, 1);
        this.props.setSyncState({
          homeFlowList: [...homeFlowList]
        });
      }
    });
  }

  render() {
    const { loading, success } = this.state;
    const { homeNavType, channelList, homeFlowList, messageList } = this.props;

    return (
      <div className="page-root page-home">
        <Helmet>
          <title>今日头疼-首页</title>
          <meta name="description" content="这是今日头疼的首页啊" />
          <meta name="keywords" content="今日头疼 首页" />
        </Helmet>
        
        <Header messageList={messageList} />
        <Navbar type={homeNavType} channelList={channelList} onChangeNav={this.handleChangeNav} />
        <div className="feedlist" ref={el => this.feedListDom = el} onScroll={this.saveFeedListScroll}>
          {loading && <div className="loading">推荐中...</div>}
          {success && <div className="success">成功为您推荐了10条资讯</div>}
          {homeFlowList.map((item, idx) => {
            return (
              <FeedFlow
                key={item.id}
                data={item}
                onFriend={(isFriend) => this.handleFeedFriend(idx, isFriend)}
                onRemove={() => this.handleFeedRemove(idx)}
              />
            );
          })}
          <div className="feed-none">————————— 到底了 —————————</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {...state.homePage};
};

const mapDispatchToProps = {
  getPageData,
  setSyncState
};

export default isoConnect({
  css,
  mapStateToProps,
  mapDispatchToProps
}, Home);