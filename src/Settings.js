import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.passwordRef = React.createRef();
  }
  checkPassword(pw) {
    // The function does not validate the password.
    // It only checks whether the password input is empty or not!
    if (!pw) {
      // Password is empty. Show warning.
      alert("Please insert your password.");
      return false;
    }
    return true;
  }
  render() {
    return (
      <div className="SettingsWindow" ref={this.props.innerRef}>
        <h3>Settings</h3>
        <div className="Wrapper">
          <span className="Attribute">id:</span>
          <span className="Value">{this.props.myId}</span>
        </div>
        <div className="Wrapper">
          <span className="Attribute">password:</span>
          <input type="password" className="Value SettingsInput" ref={this.passwordRef}></input>
        </div>
        <button className="DeleteButton" onClick={() => {
          const pw = this.passwordRef.current.value;
          if (this.checkPassword(pw)) {
            this.props.deleteAccount(pw);
          }
        }}>
          Delete Account
        </button>
      </div>
    )
  }
}

export default Settings;