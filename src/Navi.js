import React, { Component } from 'react';
import Settings from './Settings';
import ClientList from './ClientList';
import './Navi.css';

class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientListFlag: false,
      settingsFlag: false
    };
    this.refClientListButton = React.createRef();
    this.refClientList = React.createRef();
    this.refSettingsButton = React.createRef();
    this.refSettings = React.createRef();
  }

  toggleClientList() {
    const toggle = this.state.clientListFlag;
    this.setState({ clientListFlag: !toggle });
  }
  clickOutsideUserList = (e) => {
    e.stopPropagation();
    if (this.refClientListButton && this.refClientList && this.state.clientListFlag) {
      if (!this.refClientListButton.current.contains(e.target) && !this.refClientList.current.contains(e.target))
        this.toggleClientList();
    }
  }

  toggleSettings() {
    const toggle = this.state.settingsFlag;
    this.setState({ settingsFlag: !toggle });
  }
  clickOutsideSettings = (e) => {
    e.stopPropagation();
    if (this.refSettingsButton && this.refSettings && this.state.settingsFlag) {
      if (!this.refSettingsButton.current.contains(e.target) && !this.refSettings.current.contains(e.target))
        this.toggleSettings();
    }
  }

  // Well, it seems not clean enough to add event listener all over the document,
  // but what choice do I have...
  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutsideUserList);
    document.addEventListener('mousedown', this.clickOutsideSettings);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutsideUserList);
    document.removeEventListener('mousedown', this.clickOutsideSettings);
  }

  render() {
    return (
      <nav className="Navi">
        <div className="LeftAlign">
          <div className={`Connection ${this.props.socketConnected ? 'Connected' : 'Disconnected'}`} />
          <button className="NaviButton"
            ref={this.refClientListButton}
            onClick={() => { this.toggleClientList(); }}>
            Client List
          </button>
          <button className="NaviButton"
            ref={this.refSettingsButton}
            onClick={() => { this.toggleSettings(); }}>
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
        {this.state.clientListFlag && <ClientList innerRef={this.refClientList} clientList={this.props.clientList} />}
        {this.state.settingsFlag &&
          <Settings
            innerRef={this.refSettings}
            myId={this.props.myId}
            deleteAccount={this.props.deleteAccount}
            changePassword={this.props.changePassword}
          />}
      </nav>
    )
  }
}

export default Navi;