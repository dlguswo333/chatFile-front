import { React, Component } from 'react';
import ChatBoard from './ChatBoard';
import InputBoard from './InputBoard';
import io from 'socket.io-client';
import Navi from './Navi';
import Login from './Login';
import './App.css';

const server_port = 8000;
const socket = io(`localhost:${server_port}`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myUserName: '',
      messageList: [],
      isLoggedIn: false,
      inputText: '',
    };
    this.onSend = this.onSend.bind(this);
    this.onInputTextChange = this.onInputTextChange.bind(this);
  }

  componentDidMount() {
    socket.on('connect', () => {
      this.setState({
        myUserName: socket.id,
      });
    });

    socket.on('full message list', (fullMessageList) => {
      this.setState({
        messageList: fullMessageList
      });
    });

    socket.on('chat message', (message) => {
      // reject duplicated message if there is any
      if (this.state.messageList !== [] || message.key !== this.state.messageList[this.state.messageList.length - 1].key)
        this.onReceive(message);
    });
  }

  onInputTextChange(value) {
    this.setState({ inputText: value });
  }

  onSend() {
    var message = {};
    message['userName'] = socket.id;
    message['value'] = this.state.inputText;
    socket.emit('chat message', message);
  };
  onReceive(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="App">
          <Navi />
          <ChatBoard messageList={this.state.messageList} myUserName={this.state.myUserName} getFunction={this.getFunction} />
          <InputBoard name="input" input={this.state.inputText} onInputTextChange={this.onInputTextChange} onSend={this.onSend} />
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Login ></Login>
        </div>
      );
    }
  }
}


export default App;
