import React, { Component } from 'react';
import axios from 'axios';

import ChatBoard from './ChatBoard';
import InputBoard from './InputBoard';
import io from 'socket.io-client';
import Navi from './Navi';
import Login from './Login';
import './App.css';
import data from './data';

const socket = io(`localhost:${data.back_port}`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myUserName: '',
      messageList: [],
      isLoggedIn: false,
      inputText: '',
    };
    this.refChatBoard = React.createRef();

    this.sendText = this.sendText.bind(this);
    this.sendFile = this.sendFile.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.onInputTextChange = this.onInputTextChange.bind(this);
  }

  componentDidMount() {
    socket.on(data.front_connect, () => {
      this.setState({
        myUserName: socket.id,
      });
      console.log(socket.id);
    });

    socket.on(data.full_message_list, (fullMessageList) => {
      this.setState({
        messageList: fullMessageList
      });
    });

    socket.on(data.new_message, (message) => {
      // reject duplicated message if there is any
      if (this.state.messageList !== [] || message.key !== this.state.messageList[this.state.messageList.length - 1].key)
        this.onReceive(message);
    });
  }

  onInputTextChange(value) {
    this.setState({ inputText: value });
  }

  sendText() {
    var message = {};
    message['userName'] = this.state.myUserName;
    message['value'] = this.state.inputText;
    socket.emit(data.new_message, message);
  };

  sendFile(files) {
    const file = files[0];
    if (file.size > data.max_file_size) {
      alert('File size is too big!');
      return;
    }
    var formData = new FormData();
    formData.append('file', file);
    formData.append('userName', this.state.myUserName);
    axios.post(`http://localhost:${data.back_port}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        console.log(Math.round(100 * e.loaded / e.total));
      }
    }).then((res) => {
      console.log('sended file ' + file);
    }).catch((err) => {
      console.log(err);
    })
  }

  downloadFile(key) {
    var link = `http://localhost:${data.back_port}/files/${key}`;
    var a = document.createElement('A');
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  onReceive(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
    this.refChatBoard.current.scrollToBottom();
  }
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="App">
          <Navi />
          <ChatBoard
            messageList={this.state.messageList}
            myUserName={this.state.myUserName}
            getFunction={this.getFunction}
            downloadFile={this.downloadFile}
            ref={this.refChatBoard}
          />
          <InputBoard name="input"
            input={this.state.inputText}
            onInputTextChange={this.onInputTextChange}
            sendText={this.sendText}
            sendFile={this.sendFile}
          />
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
