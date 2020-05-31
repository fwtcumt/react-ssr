import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const curType = this.props.type;
    const domEl = this[`nav${curType}`];
    if (!domEl) return;
    
    domEl.scrollIntoView();
  }

  componentDidUpdate(preProps) {
    const preType = preProps.type;
    const curType = this.props.type;
    if (preType !== curType) {
      const domEl = preType > curType ?
      this[`nav${curType - 2}`] || this[`nav${curType - 1}`] || this[`nav${curType}`] :
      this[`nav${curType + 2}`] || this[`nav${curType + 1}`] || this[`nav${curType}`];
      domEl.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  }

  render() {
    const { type, onChangeNav, channelList } = this.props;
    const includeChannels = channelList.filter(v => v.include);

    return (
      <div className="navbar">
        <div className="navlist">
          {includeChannels.map(item => (
            <span
              key={item.id}
              ref={el => this[`nav${item.id}`] = el}
              className={item.id === type ? 'nav active' : 'nav'}
              onClick={() => onChangeNav(item.id)}
            >{item.name}</span>
          ))}
        </div>
        <Link className="plusnav" to="/channels" />
      </div>
    );
  }
}

export default NavBar;
