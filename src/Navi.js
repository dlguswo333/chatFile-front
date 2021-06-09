import React, { Component } from 'react';
import ClientList from './ClientList';
import './Navi.css';

class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientListFlag: false,
    };
    this.refClientListButton = React.createRef();
    this.refClientList = React.createRef();
    this.refSettingsButton = React.createRef();
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

  // Well, it seems not clean enough to add event listener all over the document,
  // but what choice do I have...
  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutsideUserList);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutsideUserList);
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
            onClick={this.props.toggleShowSettings}>
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
      </nav>
    )
  }
}

export default Navi;