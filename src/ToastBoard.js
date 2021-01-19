import React, { Component } from 'react';
import './ToastBoard.css';

var nextToastKey = 0;

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
      let toastList = this.state.toastList;
      toastList = toastList.filter((toast) => { return toast.type !== null; });
      toastList = toastList.slice(0, 5);
      this.setState({ toastList: toastList });
    }
    const toastList = this.state.toastList.map((toast) => {
      if (toast.type === 'noti') {
        return <div className="Toast" key={toast.key}>
          {toast.content}
        </div>
      }
      else if (toast.type === 'progress') {
        return <div className="Toast" key={toast.key}>
          {toast.content}
        </div>
      }
      return null;
    });
    return toastList;
  }

  editToast(toastKey, toast) {
    let toastList = [...this.state.toastList];
    let toastInd = toastList.findIndex((toast) => { return toast.key === toastKey; });
    if (toastInd < 0)
      return;
    toast.key = toastKey;
    toastList[toastInd] = toast;
    if (toast.type === 'noti') {
      setTimeout(() => {
        toast.type = null;
      }, 3000);
    }
    this.setState({ toastList: toastList });
  }

  pushToast(toast) {
    if (toast.type === undefined || toast.content === undefined) {
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
    toast.key = nextToastKey++;
    return toast.key;
  }

  render() {
    return (
      <div className="ToastBoard">
        <button onClick={() => {
          this.pushToast(
            { type: (nextToastKey % 2 === 0 ? 'noti' : 'progress'), content: (nextToastKey % 2 === 0 ? 'hello thereejfawjflkajewfjafj' : 'in progress...') }
          );
        }}>Click Me</button>
        {this.getToasts()}
      </div>
    );
  }
}

export default Toast;
