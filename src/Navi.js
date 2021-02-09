import React, { Component } from 'react';
import './Navi.css';
import ClientList from './ClientList';

class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userListFlag: false
    };
    this.refClientListButton = React.createRef();
    this.toggleClientList = this.toggleClientList.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  toggleClientList() {
    const toggle = this.state.userListFlag;
    this.setState({ userListFlag: !toggle });
  }

  onClickOutside(e) {
    if (this.refClientListButton && this.state.userListFlag && !this.refClientListButton.current.contains(e.target)) {
      this.toggleClientList();
    }
  }
  // Well, it seems not clean enough to add event listener all over the document,
  // but what choice do I have...
  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside, true);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside, true);
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
        </div>
        <div className='RightAlign' >
          {this.props.signedIn &&
            <button className="NaviButton" onClick={() => {
              console.log("Sign Out");
              this.props.signOut();
            }}>Sign Out</button>
          }
        </div>
      </nav>
    )
  }
}

export default Navi;