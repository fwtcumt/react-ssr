import React from 'react';

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { messageList } = this.props;
    
    return (
      <div className="message-box">
        <header className="header">
          我的消息盒子
          <span className="back" onClick={this.props.onBack} />
        </header>
        <div className="message-list">
          {messageList.map(item => (
            <div className="message-item" key={item.id}>
              <div className="item-left">
                <div className="user-avatar">
                  <img src={item.user.avatar} alt=""/>
                  {item.user.isVip && <span className="vip" />}
                </div>
              </div>
              <div className="item-meddle">
                <div className="user-name">{item.user.name}</div>
                <div className="user-label line1">{item.user.label}&nbsp;</div>
                <div className="user-message">
                  {item.messageType === 'like' && <span role="img" aria-label="">👍</span>}
                  {item.messageType === 'reply' && item.replyInfo}
                </div>
                <div className="user-time">{item.messageTime}</div>
                {item.messageType === 'like' && item.otherLike && <div className="other-like">还有{item.otherLike}人点赞→</div>}
              </div>
              <div className="item-right">
                <div>{item.originMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MessageBox;
