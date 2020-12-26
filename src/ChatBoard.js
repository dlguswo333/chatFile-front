import { React, Component } from 'react';
import './ChatBoard.css';

class ChatBoard extends Component {
  render() {
    return (
      <div className="ChatBoard">
        {this.props.share}
      </div>
    )
  }
}

export default ChatBoard;