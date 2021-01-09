import React, { Component } from 'react';
import './InputBoard.css';

class InputBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.refTextArea = React.createRef();
    this.refFileArea = React.createRef();
  }

  sendText = () => {
    this.props.sendText();
    this.refTextArea.current.value = '';
    this.props.onInputTextChange('');
  }


  componentDidMount() {
    this.refTextArea.current.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.keyCode === 13) {
        this.sendText();
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

        <button className="SendButton" onClick={(e) => {
          e.preventDefault();
          this.sendText();
        }}>📢</button>

        <button className="SendButton" onClick={(e) => {
          e.preventDefault();
          this.refFileArea.click();
        }}>📂</button>

        {/* hidden file input component */}
        <input type="file" name="fileInput"
          style={{ visibility: 'hidden', display: 'none' }}
          ref={(refFileArea) => {
            return this.refFileArea = refFileArea
          }}
          onChange={(e) => {
            this.props.sendFile(e.target.files);
            e.target.value = '';
          }} />
      </div >
    )
  }
}

export default InputBoard;