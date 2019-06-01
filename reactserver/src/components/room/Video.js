import React, { Component } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import axios from 'axios'
const axiosOptions = {
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "http://localhost:3000"
  },
  withCredentials: true
}

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opponent: '',
      username: '',
      peer: ''
    };
  }

  componentDidMount() {
    let socket = this.props.socket;

    socket.on('peerusername', data => {
      console.log(data)
      this.setState({username: this.props.username, opponent: data})
      const peer = new Peer({key: 'lwjd5qra8257b9', id: this.state.username});
      this.setState({peer})
      socket.emit('readyforrtc', this.state.username)

      peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
      });

    })
    socket.on('readyforrtc', (opponent) => {
      console.log(opponent)
      this.setState({username: this.props.username, opponent})
      const peer = new Peer({key: 'lwjd5qra8257b9', id: this.state.username});
      this.setState({peer});
      this.connect();

    })
  }

  connect = () => {
    this.state.peer.connect(this.state.opponent)
    this.state.peer.on('open', function(id) {
      console.log('My peer ID is: ' + id);
    });
  }

  startVideo = (e) => {
    let socket = this.props.socket
    socket.emit('startvideo', this.props.username)
  }

  render() {
    return(
      <div>
      <h1 onClick={this.startVideo}>start video</h1>

      </div>
    )
  }
}

export default Video