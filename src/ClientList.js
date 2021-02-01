import React, { Component } from 'react';
import './ClientList.css';

class ClientList extends Component {
  getClientList() {
    let clientList = [];
    this.props.clientList.forEach((value, id) => {
      if (id !== undefined)
        clientList.push(
          <div className="Client">
            <div className={`Connection ${value ? 'Connected' : 'Disconnected'}`} />
            {id}
          </div>
        );
    });
    return clientList;
  }

  render() {
    return (
      <div className="ClientList">
        {this.getClientList()}
      </div>
    );
  }
}

export default ClientList;
