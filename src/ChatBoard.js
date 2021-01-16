import React, { Component } from 'react';
import Message from './Message';
import './ChatBoard.css';

class ChatBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: 0,
      height: 0
    };
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

  scrollToBottom() {
    var current = this.refSelf.current;
    if (current.scrollTop + current.clientHeight >= current.scrollHeight - current.clientHeight) {
      current.scrollTop = current.scrollHeight;
    }
  }

  render() {
    return (
      <div
        className="ChatBoard"
        ref={this.refSelf}
        onScroll={(e) => {
          this.setState({
            scrollPosition: e.target.scrollTop,
            height: 0
          });
        }}>
        {this.getMessages()}
        {/* {this.scrollToBottom()} */}
      </div>
    )
  }
}

export default ChatBoard;