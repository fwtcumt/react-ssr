import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'components/Modal';
import Messagebox from './messagebox.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  handleOpenMessage = () => {
    this.setState({ modalVisible: true });
  }

  render() {

    return (
      <header className="header">
        <span className="hd-l" onClick={this.handleOpenMessage} />
        <div className="hd-m" />
        <Link className="hd-r" to="/hot" />

        {/* 消息盒子 */}
        {!__SERVER__ && <Modal
          visible={this.state.modalVisible}
          direction="left"
        >
          <Messagebox messageList={this.props.messageList} onBack={() => this.setState({ modalVisible: false })} />
        </Modal>}
      </header>
    );
  }
}

export default Header;
