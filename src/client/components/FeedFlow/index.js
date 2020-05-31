import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import css from './index.less';
import SmartLink from '../SmartLink';

/**
 * @ data 模板对象
 * @param {string} data.id 信息流id
 * @param {string} data.title 标题
 * @param {string} data.publishTime 发布时间
 * @param {number} data.commentNum 评论数
 * @param {string} data.feedType 信息流模板类型
 * @param {array} data.pics 图片数组
 * @param {string} data.adLink 广告链接
 * @param {boolean} data.isAd 是不是广告
 * @param {boolean} data.isTop 是不是置顶
 * @param {boolean} data.isHot 是不是热门
 * @param {boolean} data.showHead 是否显示头像
 * 
 * @ data.author 作者对象
 * @param {string} author.id 作者id
 * @param {string} author.name 作者名称
 * @param {string} author.avatar 作者头像
 * @param {string} author.label 作者标签
 * @param {boolean} author.vip 作者是否是vip
 * @param {boolean} author.friend 是否关注了作者
 * 
 * @ 回调函数
 * @param {function} onFriend 关注或者取关 (isFriend) => {}
 * @param {function} onRemove 移除广告
**/
class FeedFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  preventClick = e => {
    e.stopPropagation();
    e.preventDefault();
  }

  handleRemove = () => {
    this.props.onRemove && this.props.onRemove();
  }

  handleFriend = () => {
    this.props.onFriend && this.props.onFriend(this.props.data.author.friend);
  }

  // 渲染info部分
  renderInfo = () => {
    const { data } = this.props;
    const { publishTime, commentNum, author, isAd, isTop, isHot, showHead } = data;
    const { name } = author;
    return (
      <div className="feed-info" onClick={this.preventClick}>
          <div className="info-l">
            {isAd && <span className="ad">广告</span>}
            {isTop && <span className="red">置顶</span>}
            {isHot && <span className="red">热门</span>}
            {!showHead && <span>{name}</span>}
            {!isAd && <span>评论 {commentNum}</span>}
            <span>{publishTime}</span>
          </div>
          <div className="info-r">
            {isAd && <span className="close" onClick={this.handleRemove} />}
          </div>
        </div>
    );
  }

  // 渲染body部分
  renderBody = () => {
    const { data } = this.props;
    const { title, feedType, pics, duration } = data;
    const feedBody = {
      smallpic: (
        <>
          <div className="feed-l">
            <div className="feed-tit line3" dangerouslySetInnerHTML={{ __html: title }}></div>
            {this.renderInfo()}
          </div>
          <div className="feed-r">
            <img src={pics[0]} alt=""/>
          </div>
        </>
      ),
      threepic: (
        <>
          <div className="feed-tit line3" dangerouslySetInnerHTML={{ __html: title }}></div>
          {pics.length > 0 && <div className="feed-pic">
            {pics.map((pic, i) => <img key={i} src={pic} alt=""/>)}
          </div>}
          {this.renderInfo()}
        </>
      ),
      bigpic: (
        <>
          <div className="feed-tit line3" dangerouslySetInnerHTML={{ __html: title }}></div>
          {pics[0] && <div className="feed-pic">
            <img src={pics[0]} alt=""/>
          </div>}
          {this.renderInfo()}
        </>
      ),
      feedvideo: (
        <>
          <div className="feed-pic">
            <img src={pics[0]} alt=""/>
            <div className="feed-tit">
              <div className="line2" dangerouslySetInnerHTML={{ __html: title }}></div>
            </div>
            <span className="videoplay" />
            <span className="videotime">{duration}</span>
          </div>
          {this.renderInfo()}
        </>
      )
    };
    return feedBody[feedType];
  }

  render() {
    const { data } = this.props;
    const { feedType, author, isAd, adLink, showHead } = data;
    const { name, avatar, label, vip, friend } = author;
    const linkUrl = {
      href: isAd && adLink,
      to: !isAd && `/${feedType === 'feedvideo' ? 'video' : 'p'}/${data.id}`
    };

    return (
      <SmartLink className={`feed feed-${feedType}`} {...linkUrl}>
        {showHead && <div className="feed-hd" onClick={this.preventClick}>
          <div className="author-avatar">
            <img src={avatar} alt=""/>
            {vip && <span className="vip" />}
          </div>
          <div className="author-info">
            <div className="name">{name}</div>
            <div className="label">{label}</div>
          </div>
          <div className="author-friend">
            <span
              className={friend ? 'friend' : 'unfriend'}
              onClick={this.handleFriend}
            >{friend ? '已关注' : '关注'}</span>
          </div>
        </div>}
        {this.renderBody()}
      </SmartLink>
    );
  }
}

export default withStyles(css)(FeedFlow);
