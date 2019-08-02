import React, { Component } from "react";
import socketIOClient from "socket.io-client";

var socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://0.0.0.0:2999/" 
    };

    socket = socketIOClient(this.state.endpoint);
  }

  render() {
    return null
  }

}

export { socket, Header };