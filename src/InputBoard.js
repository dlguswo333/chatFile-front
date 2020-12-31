import React, { Component } from 'react';
import './InputBoard.css';

class InputBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.refTextArea = React.createRef();
  }
  sendFunction = () => {
    this.props.onSend();
    this.refTextArea.current.value = '';
    this.props.onInputTextChange('');
  }
  componentDidMount() {
    this.refTextArea.current.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.keyCode === 13) {
        this.sendFunction();
      }
    });
  }

  render() {
    return (
      <div className="InputBoard">
        <textarea className="InputArea" placeholder="Ctrl+Enter to send the text"
          ref={this.refTextArea}
          onChange={(e) => {
            this.props.onInputTextChange(e.target.value);
          }}></textarea>
        <button className="SendButton" onClick={this.sendFunction}>📢</button>
      </div >
    )
  }
}

export default InputBoard;