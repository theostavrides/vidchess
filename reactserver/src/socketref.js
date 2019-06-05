import React, { Component } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://192.168.88.101:3001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("news", data => this.setState({ response: data.hello }));
  }
  render() {
    const { response } = this.state;
    return (
        <div>
          {response && <p>{response}</p>}
        </div>
    );
  }
}

export default App;
