import React, { Component } from 'react';
import Board from './Board.js';
import Chat from './Chat/Chat.js';
import Chessbar from './chessbar/Chessbar.js';
import Video from './Video.js';
import LinkModal from './LinkModal.js'
import Rematch from './Rematch.js'
import './Room.css';
import io from 'socket.io-client';
import axios from 'axios';
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
      redirect: false,
      username: '',
      show: true,
      rematch: false,
      allData: {},
      myTime: 300,
      theirTime: 300
    };
    this.socket =  io(`http://localhost:3001`)
  }

  componentDidMount(){
    axios.get('http://localhost:3001/auth', axiosOptions)
      .then((res) => {
        this.setState({username: res.data})
        this.joinRoom(res.data)
      }, () => this.setState({ redirect: true }))


    this.socket.on('msg', (data) => { this.setState({ messages: this.state.messages.concat(data) }) })
    this.socket.on('roomFull', (bool) => { this.setState({show: !bool}) })
    this.socket.on('startRematch', (data) => {
      this.setState({rematch: false});
      console.log(data)
    })
  }

  //When game is over, this fires to bring up rematch box
  setRematch = (data) => {
    this.setState({ allData: data})
    this.setState({ rematch: true })
  }


  //Messages
  addNewMessage = (content) => {
    const hearOwnMessage = (data) => {
      data.id = null
      this.setState({ messages: this.state.messages.concat(data) })
    }
    this.socket.emit('chat', content, hearOwnMessage);
  }

  //Join room
  joinRoom = (username) => {
    const room = this.props.match.url.split('/')[2];
    this.socket.emit('joinRoom', { room, username });
    this.socket.on('message', console.log);
  }

  //Handlers for showing link to room box
  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  //chess clock functions
  player1Interval = (bool) => {
    if (bool) {
      window.timer1 = setInterval(() => {
        let oldTime = this.state.myTime
        let newTime = oldTime - 1;
        this.setState({myTime: newTime })
      }, 1000)
    } else {
      clearInterval(window.timer1)
    }
  }

  player2Interval = (bool) => {
    if (bool) {
      window.timer2 = setInterval(() => {
        let oldTime = this.state.theirTime
        let newTime = oldTime - 1;
        this.setState({theirTime: newTime })
      }, 1000)
    } else {
      clearInterval(window.timer2)
    }
  }

  handleTimer = (msg, gameData, roomData, startTime) => {
    if (msg === 'set'){
      this.setState({ myTime: startTime, theirTime: startTime})
    }
    if (msg === 'player1'){
      this.player2Interval(true)
      this.player1Interval(false)
    }
    if (msg === 'player2'){
      this.player1Interval(true)
      this.player2Interval(false)
    }
    if (msg === 'stop'){
      clearInterval(window.timer1)
      clearInterval(window.timer2)
    }
  }


  render() {

    return (
      <div className="room-2col">
        <LinkModal show={this.state.show}/>

          {this.state.rematch && <Rematch username={this.state.username}
                                          rematch={this.state.rematch}
                                          room={this.props.match.url.split('/')[2]}
                                          allData={this.state.allData}
                                          socket={this.socket}
                                 />}

          <div className="chessboard-container">
          <Board room={this.props.match.url.split('/')[2]}
                 socket={this.socket}
                 updateGameData={this.updateGameData}
                 updateBoardData={this.updateBoardData}
                 setRematch={this.setRematch}
                 handleTimer={this.handleTimer} />
          </div>

          <div className="sidebar">
          <div className="video-container">
            <Video />
          </div>
          <Chessbar theirTime={this.state.theirTime} myTime={this.state.myTime}/>
          <Chat addNewMessage={this.addNewMessage} messages={this.state.messages} />
        </div>
      </div>
    );
  }
}

export default Room;
