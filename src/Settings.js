import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.pwRef = React.createRef();
    this.newPwRef = React.createRef();
    this.reNewPwRef = React.createRef();
  }

  checkPassword(pw) {
    // The function does not validate the password.
    // It only checks whether the password input is empty or not!
    if (!pw) {
      // Password is empty. Show warning.
      alert("Please type your current password.");
      return false;
    }
    return true;
  }

  changePassword = (pw) => {
    // This function is called after checkPassword function.
    const newPw = this.newPwRef.current.value;
    const reNewPw = this.reNewPwRef.current.value;
    if (newPw !== reNewPw) {
      alert("New passwords do not match! Please check it again.");
      return false;
    }
    this.props.changePassword(pw, newPw);
  }
  render() {
    return (
      <div className="SettingsWindow" ref={this.props.innerRef}>
        <h3>Settings</h3>
        <div className="Wrapper">
          <span className="Attribute">ID:</span>
          <span className="Value">{this.props.myId}</span>
        </div>
        <div className="Wrapper">
          <span className="Attribute">Password:</span>
          <input type="password" className="Value SettingsInput" ref={this.pwRef}></input>
        </div>
        <div className="Wrapper">
          <span className="Attribute">New Password:</span>
          <input type="password" className="Value SettingsInput" ref={this.newPwRef}></input>
        </div>
        <div className="Wrapper">
          <span className="Attribute">Retype New Password:</span>
          <input type="password" className="Value SettingsInput" ref={this.reNewPwRef}></input>
        </div>
        <button className="ChangePwButton" onClick={() => {
          const pw = this.pwRef.current.value;
          if (this.checkPassword(pw)) {
            this.changePassword(pw);
          }
        }}>
          Change Password
        </button>
        <button className="DeleteButton" onClick={() => {
          const pw = this.pwRef.current.value;
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