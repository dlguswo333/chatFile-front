import { React, Component } from 'react';
import './Navi.css';

class Navi extends Component {
  render() {
    return (
      <nav className="Navi">
        <div className={`Connection ${this.props.socketConnected ? 'Connected' : 'Disconnected'}`} />
        <button className="NaviButton" onClick={() => { console.log("User List"); }}>User List</button>
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