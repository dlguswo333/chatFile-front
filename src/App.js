import React, { Component } from 'react';
import axios from 'axios';
import cookieParser from 'cookie';
import ChatBoard from './ChatBoard';
import InputBoard from './InputBoard';
import io from 'socket.io-client';
import Navi from './Navi';
import Auth from './Auth';
import data from './data';
import ToastBoard from './ToastBoard';
import './App.css';

const socket = io(`http://localhost:${data.back_port}`, {
  withCredentials: true
});
axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props) {
    super(props);
    const signedIn = cookieParser.parse(document.cookie).signedIn;
    this.state = {
      myId: '',
      messageList: [],
      clientList: new Map(),
      signedIn: signedIn,
      socketConnected: false,
      socketConnectedInterval: null,
      inputText: '',
    };
    this.refChatBoard = React.createRef();
    this.refToastBoard = React.createRef();

    this.sendText = this.sendText.bind(this);
    this.sendFile = this.sendFile.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.onInputTextChange = this.onInputTextChange.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    // update socket connection status.
    var socketConnectedInterval = setInterval(() => {
      this.setState({ socketConnected: (socket.connected ? true : false) });
    }, 1000);
    this.setState({ socketConnectedInterval: socketConnectedInterval });

    // if the client is signed in, connect to socket io.
    if (this.state.signedIn) {
      socket.on(data.front_connect, () => {
        // on socket io connection, get my id.
        this.getMyId();
      });

      socket.on(data.full_client_list, (fullClientList) => {
        // receive full client list.
        let clientList = new Map(fullClientList);
        this.setState({ clientList: clientList });
      });

      socket.on(data.client_connect, ({ id, value }) => {
        // update client list.
        let clientList = this.state.clientList;
        clientList.set(id, value);
        this.setState({ clientList: clientList });
      });

      socket.on(data.client_disconnect, ({ id, value }) => {
        // update client list.
        let clientList = this.state.clientList;
        clientList.set(id, value);
      });

      socket.on(data.full_message_list, (fullMessageList) => {
        // receive all messages.
        this.setState({ messageList: fullMessageList });
      });

      socket.on(data.new_message, (message) => {
        // reject duplicated message if there is any.
        if (this.state.messageList !== [] || message.key !== this.state.messageList[this.state.messageList.length - 1].key)
          this.onReceive(message);
      });

      socket.on(data.client_connect, (id) => {
        let clientList = this.state.clientList;
        clientList.set()
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.socketConnectedInterval);
  }

  onInputTextChange(value) {
    this.setState({ inputText: value });
  }

  sendText() {
    if (!socket.connected) {
      this.refToastBoard.current.pushToast(
        { type: 'noti', content: `Sorry, but you are not connected to the server.` }
      );
      return;
    }
    var message = {};
    message['id'] = null;
    message['value'] = this.state.inputText;
    socket.emit(data.new_message, message);
  };

  sendFile(files) {
    // If not connected to socket, block upload.
    if (!socket.connected) {
      this.refToastBoard.current.pushToast(
        { type: 'noti', content: `Sorry, but you are not connected to the server.` }
      );
      return;
    }
    const file = files[0];
    if (file.size > data.max_file_size) {
      alert('File size is too big!');
      return;
    }
    var formData = new FormData();
    formData.append('file', file);
    formData.append('id', this.state.myId);
    const toastKey = this.refToastBoard.current.pushToast(
      { type: 'progress', content: `Uploading File ${file.name}` }
    );
    axios.post(`http://localhost:${data.back_port}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        this.refToastBoard.current.editToast(toastKey, { type: 'progress', content: `Uploading File ${file.name} ${Math.round(100 * e.loaded / e.total)}%: ` });
      }
    }).then((res) => {
      this.refToastBoard.current.editToast(toastKey, { type: 'noti', content: `The File has been uploaded successfully!` });
    }).catch((err) => {
      this.refToastBoard.current.editToast(toastKey, { type: 'noti', content: `Uploading File ${file.name} failed...` });
      console.error(err);
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
    // Sometimes refChatBoard.current returns unknown. Solve it later.
    if (this.refChatBoard.current)
      this.refChatBoard.current.scrollToBottom(false);
  }

  signIn(id, pw) {
    var formData = new FormData();
    axios.post(`http://localhost:${data.back_port}/signIn`, formData, {
      auth: {
        username: id,
        password: pw
      }
    }).then((res) => {
      window.location.reload();
    }).catch((err) => {
      alert('Sign in failed. Check your id and password, Please.');
    });
  }

  signUp(id, pw) {
    var formData = new FormData();
    axios.post(`http://localhost:${data.back_port}/signUp`, formData, {
      auth: {
        username: id,
        password: pw
      }
    }).then((res) => {
      alert('Your account has been created successfully.')
    }).catch((err) => {
      if (err.response !== undefined)
        alert(err.response.data);
      else
        alert(`Server is not responding. Please try again later.`);
    });
  }


  signOut() {
    this.setState({ signedIn: false });
    axios.post(`http://localhost:${data.back_port}/signOut`, {
    }).then((res) => {
      // nothing to do here.
    }).catch((err) => {
      alert(err);
    });
    // reloading the window will reset all states automatically, but I wanna make it sure.
    this.setState({ messageList: [] });
    window.location.reload();
  }

  getMyId() {
    if (!this.state.signedIn) {
      // If not signed in, no need to get my id.
      return;
    }
    axios.post(`http://localhost:${data.back_port}/getMyId`, {}).then((res) => {
      const id = res.data;
      this.setState({ myId: id });
    }).catch((err) => {
      this.setState({ id: 'undefined' });
    })
  }

  render() {
    return (
      <div className="App">
        <Navi
          signedIn={this.state.signedIn}
          signOut={this.signOut}
          socketConnected={this.state.socketConnected}
          clientList={this.state.clientList}
        />
        <ChatBoard
          messageList={this.state.messageList}
          myId={this.state.myId}
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
        {!this.state.signedIn && <Auth signIn={this.signIn} signUp={this.signUp} />}
        {!this.state.signedIn && <div className="BackgroundBlur"></div>}
        <ToastBoard ref={this.refToastBoard} />
      </div>
    );
  }
}

export default App;