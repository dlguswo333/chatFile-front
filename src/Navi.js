import { React, Component } from 'react';
import './Navi.css';
import ClientList from './ClientList';

class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userListFlag: false
    };
  }

  toggleClientList() {
    const toggle = this.state.userListFlag;
    this.setState({ userListFlag: !toggle });
    console.log(this.props.clientList);
  }

  render() {
    return (
      <nav className="Navi">
        <div className="LeftAlign">
          <div className={`Connection ${this.props.socketConnected ? 'Connected' : 'Disconnected'}`} />
          <button className="NaviButton" onClick={() => { this.toggleClientList(); }}>
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