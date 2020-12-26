import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      value: ''
    };
    this.log = this.log.bind(this);
    this.submit = this.submit.bind(this);
  }
  log(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };
  submit(e) {
    e.preventDefault();
    console.log(this.state.value);
  }
  render() {
    return (
      <div className="Window">
        <form onSubmit={(e) => {
          this.submit(e);
        }}>
          <h2>Enter the Password</h2>
          < input type="password" name="password" onChange={(e) => { this.log(e) }} autoFocus={true} value={this.state.value}></input>
        </form>
      </div>
    );
  }
}

export default Login;
