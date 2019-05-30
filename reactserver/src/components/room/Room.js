import React, { Component } from 'react';
import Board from './Board.js'
import './Room.css';
import io from 'socket.io-client';

class Room extends Component {
  constructor() {
    super();
    this.state = {};
    this.socket =  io(`http://localhost:3001`)
  }

  componentDidMount(){
    const room = this.props.match.url.split('/')[2];
    this.socket.emit('joinRoom', { room });
    this.socket.on('message', console.log);
  }

  sendMove = (move) => {
    this.socket.emit('move', { move: 'pa5'})
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

              <div className="chat-container">

                <div className="message-area">
                  <div className="messages talkbubble-1"><p>What's going on? You want to play some chessticles</p></div>
                  <div className="messages talkbubble-2"><p>Of course!</p></div>
                </div>

              <div className="chatbar-container">
                <form className="chatbar">
                  <input type="text" placeholder="Write your message" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
