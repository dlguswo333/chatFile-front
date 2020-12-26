import { React, Component } from 'react';
import './InputBox.css';
import './Button.css';

class InputBox extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="InputBox">
        <textarea className="textarea"></textarea>
        <button className="send" onClick={this.props.sendFunction}>Send</button>
      </div >
    )
  }
}

export default InputBox;