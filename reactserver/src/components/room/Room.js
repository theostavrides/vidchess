import React, { Component } from 'react';
import Board from './Board.js'
import Chat from './Chat/Chat.js'
import './Room.css';
import io from 'socket.io-client';
const socket = io(`http://localhost:3001`)

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  addNewMessage = (content) => {
    this.setState({ messages: this.state.messages.concat(content) })
  }

  componentDidMount(){

    const room = this.props.match.url.split('/')[2];

    socket.on('connection', function(socket){
      socket.join(room);
      socket.to(room).emit('msg', {my: 'data'})
    });
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
