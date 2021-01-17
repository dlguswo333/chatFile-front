import React, { Component } from 'react';
import Message from './Message';
import './ChatBoard.css';

class ChatBoard extends Component {
  constructor(props) {
    super(props);
    this.refSelf = React.createRef();
  }
  getMessages() {
    const messageList = this.props.messageList.map((message) => {
      return <Message
        className={(message.id === this.props.myId ? "MyMessage" : "OtherMessage")}
        key={message.key}
        downloadFile={this.props.downloadFile}
        message={message}
      />
    });
    return messageList;
  }

  scrollToBottom(must) {
    var current = this.refSelf.current;
    if (must || (current.scrollTop + current.clientHeight >= current.scrollHeight - current.clientHeight)) {
      current.scrollTop = current.scrollHeight;
    }
  }

  componentDidMount() {
    this.scrollToBottom(true);
  }

  render() {
    return (
      <div className="ChatBoard" ref={this.refSelf}>
        {this.getMessages()}
      </div>
    )
  }
}

export default ChatBoard;