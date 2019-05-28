import React, { Component } from 'react';
import Board from './Board.js'
import './Room.css';


class Room extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div class="wrapper">
        <div class="chessboard-container">
          <Board />
        </div>
          <div class="sidebar">

            <div class="video-container"></div>

            <div class="chessbar-container">
              <div class="timer player1">00.00</div>
              <div class="timer player2">00.00</div>
              <div class="resign">
                <img src="../assets/flag.png" alt="" />
              </div>
              <div class="draw">
                <img src="../assets/handshake.png" alt="" />
              </div>
            </div>

            <div class="chat-container">

              <div class="message-area">
                <div class="messages talkbubble-1"><p>What's going on? You want to play some chessticles</p></div>
                <div class="messages talkbubble-2"><p>Of course!</p></div>
              </div>

            <div class="chatbar-container">
              <form class="chatbar">
                <input type="text" placeholder="Write your message" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
