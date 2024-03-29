import React, { Component } from 'react';
import './style/ClientList.css';

class ClientList extends Component {
  showClientList() {
    let clientList = [];
    this.props.clientList.forEach((value, id) => {
      if (id !== undefined)
        clientList.push(
          <div className="Client" key={id}>
            <div className={`Connection ${value ? 'Connected' : 'Disconnected'}`} />
            <div className="ClientId">
              {id}
            </div>
          </div>
        );
    });
    return clientList;
  }

  render() {
    return (
      <div className="ClientList" ref={this.props.innerRef}>
        {this.showClientList()}
      </div>
    );
  }
}

export default ClientList;
