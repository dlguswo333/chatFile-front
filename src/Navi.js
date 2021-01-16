import { React, Component } from 'react';
import './Navi.css';

class Navi extends Component {
  render() {
    return (
      <nav className="Navi">
        <div className="Connection">
          Connection:{this.props.socketConnected ? 'YES' : 'NO'}
        </div>
        <button className="NaviButton" onClick={() => {
          console.log("Sign Out");
          this.props.signOut();
        }}>Sign Out</button>
        <button className="NaviButton" onClick={() => { console.log("User List"); }}>User List</button>
      </nav>
    )
  }
}

export default Navi;