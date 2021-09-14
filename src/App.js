import React, { Component } from 'react';
import axios from 'axios';
import cookieParser from 'cookie';
import ChatBoard from './ChatBoard';
import InputBoard from './InputBoard';
import io from 'socket.io-client';
import Navi from './Navi';
import Auth from './Auth';
import ToastBoard from './ToastBoard';
import data from './data.json';
import Settings from './Settings';
import Blind from './Blind';
import './App.css';

/**
 * @type {io.Socket} socket
 */
const socket = io(`${data.server_url}:${data.back_port}`, {
  withCredentials: true
});
axios.defaults.withCredentials = true;

class App extends Component {
  constructor(props) {
    super(props);
    const signedIn = (cookieParser.parse(document.cookie).signedIn === 'true' ? true : false);
    this.state = {
      myId: '',
      messageList: [],
      clientList: new Map(),
      signedIn: signedIn,
      socketConnected: false,
      inputText: '',
      showSettings: false
    };
    this.refChatBoard = React.createRef();
    this.refToastBoard = React.createRef();
    this.refAuth = React.createRef();

    this.sendText = this.sendText.bind(this);
    this.sendFile = this.sendFile.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.onInputTextChange = this.onInputTextChange.bind(this);
    this.updateSocketConnected = this.updateSocketConnected.bind(this);
  }

  componentDidMount() {
    // update socket connection status.
    this.updateSocketConnected();

    // if the client is signed in, connect to socket io.
    if (this.state.signedIn) {
      // On socket io connection, get my id and get full list of messages.
      socket.on(data.front_connect, () => {
        this.getMyId();
        const messageList = this.state.messageList;
        try {
          const firstMessageDate = messageList[0].date;
          socket.emit(data.message_list, firstMessageDate);
        } catch {
          socket.emit(data.message_list, -1);
        }
      });

      // Receive full client list.
      socket.on(data.full_client_list, (fullClientList) => {
        let clientList = new Map(fullClientList);
        this.setState({ clientList: clientList });
      });

      // Update client list.
      socket.on(data.client_connect, ({ id, value }) => {
        let clientList = this.state.clientList;
        clientList.set(id, value);
        this.setState({ clientList: clientList });
      });

      // Update client list.
      socket.on(data.client_disconnect, ({ id, value }) => {
        let clientList = this.state.clientList;
        clientList.set(id, value);
        this.setState({ clientList: clientList });
      });
      socket.on(data.client_connect, ({ id, value }) => {
        let clientList = this.state.clientList;
        clientList.set(id, value);
        this.setState({ clientList: clientList });
      });

      // Receive all messages.
      socket.on(data.message_list, (messages) => {
        const messageList = this.state.messageList;
        // Full message lists must be at the first.
        // However, in some cases, individual messages could have arrived eariler.
        // In that case, move those messages at the back.
        this.setState({ messageList: [...messages, ...messageList] });
      });

      // reject duplicated message if there is any.
      socket.on(data.new_message, (message) => {
        if (this.state.messageList !== [] || message.key !== this.state.messageList[this.state.messageList.length - 1].key)
          this.onReceive(message);
      });
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
    axios.post(`${data.server_url}:${data.back_port}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        this.refToastBoard.current.editToast(toastKey, { type: 'progress', content: `Uploading File ${file.name} ${Math.round(100 * e.loaded / e.total)}%` });
      }
    }).then((res) => {
      this.refToastBoard.current.editToast(toastKey, { type: 'noti', content: `${file.name} has been uploaded successfully!` });
    }).catch((err) => {
      this.refToastBoard.current.editToast(toastKey, { type: 'noti', content: `Uploading File ${file.name} failed...` });
      console.error(err);
    })
  }

  downloadFile(key) {
    var link = `${data.server_url}:${data.back_port}/files/${key}`;
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

  signIn = (id, pw) => {
    var formData = new FormData();
    axios.post(`${data.server_url}:${data.back_port}/signIn`, formData, {
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

  signUp = (id, pw) => {
    var formData = new FormData();
    axios.post(`${data.server_url}:${data.back_port}/signUp`, formData, {
      auth: {
        username: id,
        password: pw
      }
    }).then((res) => {
      alert('Your account has been created successfully.');
      this.refAuth.current.toggle();
    }).catch((err) => {
      if (err.response !== undefined)
        alert(err.response.data);
      else
        alert(`Server is not responding. Please try again later.`);
    });
  }

  signOut = () => {
    this.setState({ signedIn: false });
    axios.post(`${data.server_url}:${data.back_port}/signOut`, {
    }).then((res) => {
      // Successfuly signed out.
      window.location.reload();
    }).catch((err) => {
      // Error occured, nothing to do here.
      window.location.reload();
    });
  }

  deleteAccount = (pw) => {
    // Back-end will sign the client out after deleting the account. No need to worry about it.
    let formData = new FormData();
    formData.append('password', pw);
    axios.post(`${data.server_url}:${data.back_port}/deleteAccount`, formData, {
    }).then((res) => {
      // Successfully deleted my id.
      alert(`Your account has been deleted successfully!`);
      window.location.reload();
    }).catch((err) => {
      alert((err.response.data ? err.response.data : 'Undefined error. Please try again later.'));
    });
  }

  getMyId() {
    if (!this.state.signedIn) {
      // If not signed in, no need to get my id.
      return;
    }
    axios.post(`${data.server_url}:${data.back_port}/getMyId`, {}).then((res) => {
      const id = res.data;
      this.setState({ myId: id });
    }).catch((err) => {
      console.error(`getting my id failed`);
      console.error(err);
      this.setState({ myId: 'undefined' });
    });
  }

  changePassword = (pw, newPw) => {
    if (!this.state.signedIn) {
      // If not signed in, no need to change password.
      return;
    }
    let formData = new FormData();
    formData.append('password', pw);
    formData.append('newPassword', newPw);
    axios.post(`${data.server_url}:${data.back_port}/changePassword`, formData, {
    }).then((res) => {
      // Successfully changed password.
      // Sign out.
      alert(`Your password has been changed successfully.\nPlease sign in with the new password.`);
      this.signOut();
    }).catch((err) => {
      // Changing password failed.
      alert(err.response.data);
    });
  }

  updateSocketConnected() {
    this.setState({ socketConnected: (socket.connected ? true : false) });
    setTimeout(this.updateSocketConnected, 1000);
  }

  toggleShowSettings = () => {
    const tmp = this.state.showSettings;
    this.setState({ showSettings: !tmp });
  }

  render() {
    return (
      <div className="App">
        <Navi
          signedIn={this.state.signedIn}
          signOut={this.signOut}
          socketConnected={this.state.socketConnected}
          clientList={this.state.clientList}
          myId={this.state.myId}
          toggleShowSettings={this.toggleShowSettings}
        />
        <ChatBoard
          messageList={this.state.messageList}
          myId={this.state.myId}
          getFunction={this.getFunction}
          downloadFile={this.downloadFile}
          ref={this.refChatBoard}
        >
        </ChatBoard>
        <InputBoard name="input"
          input={this.state.inputText}
          onInputTextChange={this.onInputTextChange}
          sendText={this.sendText}
          sendFile={this.sendFile}
        />
        {this.state.showSettings &&
          <Settings
            myId={this.state.myId}
            deleteAccount={this.deleteAccount}
            changePassword={this.changePassword}
            toggleShowSettings={this.toggleShowSettings}
          />}
        {!this.state.signedIn && <Auth ref={this.refAuth} signIn={this.signIn} signUp={this.signUp} />}
        {(!this.state.signedIn || this.state.showSettings) && <Blind />}
        <ToastBoard ref={this.refToastBoard} />
      </div>
    );
  }
}

export default App;