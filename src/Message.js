import React, { Component } from 'react';
import './Message.css';

const prettyFileSize = (size) => {
  const units = [' B', ' KB', ' MB', ' GB'];
  let unit = 0;
  while (size >= 1024) {
    size /= 1024;
    ++unit;
  }
  return size.toFixed(2) + units[unit];
}

class Message extends Component {
  getDate() {
    const date = new Date(this.props.message.date);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  processMessageValue() {
    if (this.props.message.type === 'text') {
      return this.props.message.value;
    }
    else if (this.props.message.type === 'file') {
      return (
        <div>
          <div className="FileDiv">{this.props.message.fileName}</div>
          <div className="FileDiv">{prettyFileSize(this.props.message.fileSize)}</div>
          <button className="DownloadButton"
            onClick={() => {
              this.props.downloadFile(this.props.message.key1)
            }}>Download</button>
        </div>
      )
    }
  }
  render() {
    return (
      <div className={this.props.className}>
        <div className="UserNameDiv">
          {this.props.message.userName}
        </div>
        <div className="ValueDiv">
          {this.processMessageValue()}
        </div>
        <div className="DateDiv">
          {this.getDate()}
        </div>
      </div>
    )
  }
}

export default Message;