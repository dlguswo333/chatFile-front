import React, { Component } from 'react';
import data from './data';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      toggleSignIn: true,
      id: '',
      pw: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.refId = React.createRef();
    this.refPw = React.createRef();
    this.refRePw = React.createRef();
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.toggleSignIn) {
      // sign in process.
      this.props.signIn(this.state.id, this.state.pw);
    }
    else {
      // sign up process.
      if (this.refPw.current.value !== this.refRePw.current.value) {
        alert('Passwords do not match!');
        return;
      }
      if (this.state.id.length < data.min_id_len) {
        alert(`ID should be at least ${data.min_pw_len} long!`);
        return;
      }
      if (this.state.pw.length < data.min_pw_len) {
        alert(`Password should be at least ${data.min_pw_len} long!`);
        return;
      }
      for (let i = 0; i < data.not_these_letters.length; ++i) {
        if (this.state.id.includes(data.not_these_letters[i])) {
          alert(`ID and Password should not contain letter: ${data.not_these_letters[i]}`);
          return;
        }
      }
      for (let i = 0; i < data.not_these_letters.length; ++i) {
        if (this.state.pw.includes(data.not_these_letters[i])) {
          alert(`ID and Password should not contain letter: ${data.not_these_letters[i]}`);
          return;
        }
      }
      this.props.signUp(this.state.id, this.state.pw);
    }
  }
  onChange(e) {
    e.preventDefault();
    for (var i = 0; i < data.not_these_letters.length; ++i) {
      if (e.target.value.includes(data.not_these_letters[i])) {
        alert(`ID and Password cannot contain letter '${data.not_these_letters[i]}'`);
        e.target.value = e.target.value.replace(data.not_these_letters[i], '');
        return;
      }
    }
  }

  render() {
    if (this.state.toggleSignIn)
      return (
        <div className="Window">
          <h3>Sign In</h3>
          <form onSubmit={(e) => {
            this.onSubmit(e);
          }}>
            <div>
              <input type="text"
                maxLength={10}
                placeholder="ID"
                ref={this.refId}
                onChange={(e) => {
                  this.onChange(e);
                  this.setState({ id: e.target.value });
                }}
              ></input>
            </div>
            <div>
              <input type="password"
                maxLength={10}
                placeholder="Password"
                ref={this.refPw}
                onChange={(e) => {
                  this.onChange(e);
                  this.setState({ pw: e.target.value });
                }}
              ></input>
            </div>
            <div>
              <button className="SubmitButton" onClick={(e) => { this.onSubmit(e) }}>Submit</button>
            </div>
          </form>
          <div className="ButtonDiv">
            < button className="ToggleButton" onClick={() => { this.setState({ toggleSignIn: !this.state.toggleSignIn }); }}>
              Sign Up
            </button>
          </div>
        </div>
      );
    else
      return (
        <div className="Window">
          <h3>Sign Up</h3>
          <form onSubmit={(e) => {
            this.onSubmit(e);
          }}>
            <div>
              <input type="text"
                maxLength={10}
                placeholder="ID"
                ref={this.refId}
                onChange={(e) => {
                  this.onChange(e);
                  this.setState({ id: e.target.value });
                }}
              ></input>
            </div>
            <div>
              <input type="password"
                maxLength={10}
                placeholder="Password"
                ref={this.refPw}
                onChange={(e) => {
                  this.onChange(e);
                  this.setState({ pw: e.target.value });
                }}
              ></input>
            </div>
            <div>
              <input type="password"
                placeholder="Retype Password"
                ref={this.refRePw}
                onChange={(e) => {
                  this.onChange(e);
                  this.setState({ pw: e.target.value });
                }}
              ></input>
            </div>
            <div>
              <button className="SubmitButton" onClick={(e) => { this.onSubmit(e) }}>Submit</button>
            </div>
          </form>
          <div className="ButtonDiv">
            < button className="ToggleButton" onClick={() => { this.setState({ toggleSignIn: !this.state.toggleSignIn }); }}>
              Sign In
            </button>
          </div>
        </div>
      );
  }
}

export default Auth;
