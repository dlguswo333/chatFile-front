import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      id: '',
      pw: ''
    };
    this.log = this.log.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.refId = React.createRef();
    this.Pw = React.createRef();
  }
  log(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };
  onSubmit(e) {
    e.preventDefault();
    this.props.signIn(this.state.id, this.state.pw);
  }
  render() {
    return (
      <div className="Window">
        <form onSubmit={(e) => {
          this.onSubmit(e);
        }}>
          <h2>Enter the Password</h2>
          <div>
            < input type="text"
              placeholder="username"
              ref={this.refId}
              onChange={(e) => {
                e.preventDefault();
                this.setState({ id: e.target.value });
              }}
            ></input>
          </div>
          <div>
            < input type="password"
              placeholder="password"
              ref={this.Pw}
              onChange={(e) => {
                e.preventDefault();
                this.setState({ pw: e.target.value });
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
