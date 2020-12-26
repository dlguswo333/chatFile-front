import { React, Component } from 'react';
import ChatBoard from './ChatBoard';
import InputBox from './InputBox';
import Navi from './Navi';
import Login from './Login';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      share: 1,
      isLoggedIn: false
    };
    this.sendFunction = this.sendFunction.bind(this);
  }
  sendFunction() {
    this.setState({ share: this.state.share + 1 });
  };
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="App">
          <Navi />
          <ChatBoard share={this.state.share} getFunction={this.getFunction} />
          <InputBox name="input" share={this.state.share} sendFunction={this.sendFunction} />
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
