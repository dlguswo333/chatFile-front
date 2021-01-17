import React, { Component } from 'react';
import './ToastBoard.css';

var i = 0;

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      // { key, type( 'noti' || 'progress' ), content }
      toastList: []
    };
  }

  getToasts() {
    const len = this.state.toastList.length;
    // cut if too long.
    if (len > 5) {
      this.setState({ toastList: this.state.toastList.slice(len - 5, len) });
    }
    const toastList = this.state.toastList.map((toast) => {
      if (toast.type === 'noti') {
        return <div className="Toast" key={toast.key}>
          {toast.content}
        </div>
      }
      else if (toast.type === 'progress') {
        return <div className="Toast" key={toast.key}>
          {toast.content + 100 + '%'}
        </div>
      }
      return null;
    });
    return toastList;
  }

  pushToast(toast) {
    if (toast.key === undefined || toast.type === undefined || toast.content === undefined) {
      // reject bad toast.
      return;
    }
    if (toast.type === 'noti') {
      setTimeout(() => {
        toast.type = null;
      }, 3000);
    }
    this.setState({
      toastList: [...this.state.toastList, toast]
    });
  }

  render() {
    return (
      <div className="ToastBoard">
        <button onClick={() => {
          this.pushToast(
            { key: i++, type: (i % 2 === 0 ? 'noti' : 'progress'), content: (i % 2 === 0 ? 'hello thereejfawjflkajewfjafj' : 'in progress...') }
          );
        }}>Click Me</button>
        {this.getToasts()}
      </div>
    );
  }
}

export default Toast;
