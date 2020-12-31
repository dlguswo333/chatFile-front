import { React, Component } from 'react';
import './Navi.css';

class Navi extends Component {
  render() {
    return (
      <nav className="Navi">
        <button className="NaviButton" onClick={() => { console.log("Home"); }}>Home</button>
        <button className="NaviButton" onClick={() => { console.log("User List"); }}>User List</button>
      </nav>
    )
  }
}

export default Navi;