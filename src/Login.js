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
    this.onSubmit = this.onSubmit.bind(this);
    this.refUserName = React.createRef();
    this.refPassword = React.createRef();
  }
  log(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.value);
  }
  render() {
    return (
      <div className="Window">
        <form onSubmit={(e) => {
          this.onSubmit(e);
        }}>
          <h2>Enter the Password</h2>
          <div>
            < input type="text" placeholder="username" ref={this.refUserName}
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value);
              }}
            ></input>
          </div>
          <div>
            < input type="password" placeholder="password" ref={this.refPassword}
              onChange={(e) => {
                this.log(e)
              }}
              autoFocus={true} value={this.state.value}></input>
          </div>
          <div>
            < button className="LoginButton" onClick={(e) => { this.onSubmit(e) }}>LOGIN</button>
          </div>
        </form>
      </div >
    );
  }
}

export default Login;
