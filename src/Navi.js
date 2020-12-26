import { React, Component } from 'react';
import './Navi.css';
import './Button.css';
import Login from './Login';

class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLogin: false
    };
    this.setLogin.bind(this);
  }
  setLogin() {
    this.setState({
      openLogin: true
    });
  }
  render() {
    return (
      <nav className="Navi">
        {(this.state.openLogin && <Login ></Login>)}
        <button className="Home" onClick={() => { console.log("Home"); }}>Home</button>
        <button className="Login" onClick={() => { this.setLogin(); }}>Login</button>
      </nav>
    )
  }
}

export default Navi;