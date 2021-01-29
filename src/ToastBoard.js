import React, { Component } from 'react';
import './ToastBoard.css';

// Each toast must have unique key value.
// So, pushToast function will increment the value everytime it is called.
var nextToastKey = 0;
const maxToastListLen = 5;

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

  sliceToastList() {
    let len = this.state.toastList.length;
    if (len >= maxToastListLen) {
      // cut if too long.
      let toastList = this.state.toastList;
      toastList = toastList.filter((toast) => { return toast.type !== null; });
      len = toastList.length;
      if (len >= maxToastListLen) {
        // Still long? cut off old toasts.
        toastList = toastList.slice(len - maxToastListLen, len);
      }
      this.setState({ toastList: toastList });
    }
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
    this.sliceToastList();
    return toast.key;
  }

  render() {
    return (
      <div className="ToastBoard">
        {/* <button onClick={() => {
          this.pushToast(
            { type: (nextToastKey % 2 === 0 ? 'noti' : 'progress'), content: (nextToastKey % 2 === 0 ? 'hello thereejfawjflkajewfjafj' : 'in progress...') }
          );
        }}>Click Me</button> */}
        {this.getToasts()}
      </div>
    );
  }
}

export default Toast;
