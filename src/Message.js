import React, { Component } from 'react';
import './Message.css';

class Message extends Component {
  getDate() {
    const date = new Date(this.props.date);
    return date.toDateString();
  }
  render() {
    return (
      <div className={this.props.className}>
        <div className="UserNameDiv">
          {this.props.userName}
        </div>
        <div className="ValueDiv">
          {this.props.value}
        </div>
        <div className="DateDiv">
          {this.getDate()}
        </div>
      </div>
    )
  }
}

export default Message;