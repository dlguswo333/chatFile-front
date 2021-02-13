import React, { Component } from 'react';
import Settings from './Settings';
import ClientList from './ClientList';
import './Navi.css';

class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userListFlag: false,
      settingsFlag: false
    };
    this.refClientListButton = React.createRef();
    this.refSettingsButton = React.createRef();
  }

  toggleClientList() {
    const toggle = this.state.userListFlag;
    this.setState({ userListFlag: !toggle });
  }

  toggleSettings() {
    const toggle = this.state.settingsFlag;
    this.setState({ settingsFlag: !toggle });
  }

  clickOutsideUserList = (e) => {
    if (this.refClientListButton && this.state.userListFlag && !this.refClientListButton.current.contains(e.target)) {
      this.toggleClientList();
    }
  }

  // Well, it seems not clean enough to add event listener all over the document,
  // but what choice do I have...
  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutsideUserList, true);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutsideUserList, true);
  }

  render() {
    return (
      <nav className="Navi">
        <div className="LeftAlign">
          <div className={`Connection ${this.props.socketConnected ? 'Connected' : 'Disconnected'}`} />
          <button className="NaviButton" ref={this.refClientListButton} onClick={() => { this.toggleClientList(); }}>
            Client List
            {this.state.userListFlag && <ClientList clientList={this.props.clientList} />}
          </button>
          <button className="NaviButton" ref={this.refSettingsButton} onClick={() => { this.toggleSettings(); }}>
            Settings
          </button>
        </div>
        <div className='RightAlign' >
          {this.props.signedIn &&
            <button className="NaviButton" onClick={() => {
              console.log("Sign Out");
              this.props.signOut();
            }}>Sign Out</button>
          }
        </div>
        {!this.state.settingsFlag && <Settings />}
      </nav>
    )
  }
}

export default Navi;