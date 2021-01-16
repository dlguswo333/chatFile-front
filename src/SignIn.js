import React, { Component } from 'react';
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
    if (this.state.toggleSignIn) {
      this.props.signIn(this.state.id, this.state.pw);
    }
    else {

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
                placeholder="ID"
                ref={this.refId}
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.value.includes(':')) {
                    e.target.value = e.target.value.replace(':', '');
                  }
                  this.setState({ id: e.target.value });
                }}
              ></input>
            </div>
            <div>
              <input type="password"
                placeholder="password"
                ref={this.Pw}
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.value.includes(':')) {
                    e.target.value = e.target.value.replace(':', '');
                  }
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
          <div>
            <input type="text"
              placeholder="ID"
              ref={this.Pw}
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value.includes(':')) {
                  e.target.value = e.target.value.replace(':', '');
                }
                this.setState({ pw: e.target.value });
              }}
            ></input>
          </div>
          <div>
            <input type="text"
              placeholder="ID"
              ref={this.Pw}
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value.includes(':')) {
                  e.target.value = e.target.value.replace(':', '');
                }
                this.setState({ pw: e.target.value });
              }}
            ></input>
          </div>
          <div>
            <input type="text"
              placeholder="ID"
              ref={this.Pw}
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value.includes(':')) {
                  e.target.value = e.target.value.replace(':', '');
                }
                this.setState({ pw: e.target.value });
              }}
            ></input>
          </div>
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
