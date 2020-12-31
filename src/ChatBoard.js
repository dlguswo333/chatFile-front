import { React, Component } from 'react';
import Message from './Message';
import './ChatBoard.css';

class ChatBoard extends Component {
  getMessages() {
    const messageList = this.props.messageList.map((message) => {
      return <Message key={message['date']}
        className={(message.userName === this.props.myUserName ? "MyMessage" : "OtherMessage")}
        userName={message.userName}
        value={message.value}
        date={message.date}
      />

    });
    return messageList;
  }
  render() {
    return (
      <div className="ChatBoard">
        {this.getMessages()}
      </div>
    )
  }
}

export default ChatBoard;