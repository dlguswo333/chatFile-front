import { React, Component } from 'react';
import './Navi.css';
import './Button.css';

class Navi extends Component {
  render() {
    return (
      <nav className="Navi">
        <button className="Home" onClick={() => { console.log("Home"); }}>Home</button>
      </nav>
    )
  }
}

export default Navi;