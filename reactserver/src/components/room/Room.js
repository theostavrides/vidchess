import React, { Component } from 'react';
import Board from './Board.js'
import Chat from './Chat/Chat.js'
import './Room.css';
import io from 'socket.io-client';
import axios from 'axios'
const axiosOptions = {
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "http://localhost:3000"
  },
  withCredentials: true
}

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      redirect: false
    };
  this.socket =  io(`http://localhost:3001`)
  }

  addNewMessage = (content) => {
    this.setState({ messages: this.state.messages.concat(content) })
  }

  componentDidMount(){
    //TODO should get complex userID instead of username
    axios.get('http://localhost:3001/auth', axiosOptions)
      .then((res) => this.joinRoom(res.data), () => this.setState({ redirect: true }))
  }

  joinRoom = (username) => {
    console.log(username)
    const room = this.props.match.url.split('/')[2];
    this.socket.emit('joinRoom', { room, username });
    this.socket.on('message', console.log);
    this.socket.emit('move', { move: 'pa5'});
  }

  sendMove = (move) => {
    this.socket.emit('move', { move })
  }

  render() {

    return (
      <div className="wrapper">
        <div className="room-2col">
          <div className="chessboard-container">
              {/* <div className="link-container">
                <div className="link-header">
                  <h3>Send this link to a Friend...Or Enemy</h3>
                </div>
                <div className="link-box">
                  <p contenteditable="true">This is how we do it</p>
                </div>
              </div> */}
            <Board />
          </div>
          <div className="sidebar">

            <div className="video-container"></div>

            <div className="chessbar-container">
              <div className="timer player1">00.00</div>
              <div className="timer player2">00.00</div>
              <div className="resign">
                <img src="../assets/flag.png" alt="" />
              </div>
              <div className="draw">
                <img src="../assets/handshake.png" alt="" />
              </div>
            </div>

            <Chat addNewMessage={this.addNewMessage} messages={this.state.messages} />
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
