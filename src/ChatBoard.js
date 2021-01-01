import { React, Component } from 'react';
import Message from './Message';
import './ChatBoard.css';

class ChatBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: 0,
      height: 0
    };
  }
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

  scrollToBottom() {
    return this.state.scrollPosition + '/' + window.pageYOffset;
  }

  render() {
    return (
      <div className="ChatBoard"
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