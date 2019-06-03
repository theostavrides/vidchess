import React, { Component } from 'react';
import Board from './Board.js';
import Chat from './Chat/Chat.js';
import Chessbar from './chessbar/Chessbar.js';
import Video from './Video.js';
import { Modal, Button } from 'react-bootstrap';
// import Modal from './Modal.js';
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
      show: false,
      rematch: false,
      allData: {},
      myTime: 500,
      theirTime: 500
    };
    this.socket =  io(`http://localhost:3001`)
  }


  componentDidMount(){
    //TODO should get complex userID instead of username
    axios.get('http://localhost:3001/auth', axiosOptions)
      .then((res) => {
        this.setState({username: res.data})
        this.joinRoom(res.data)
      }, () => this.setState({ redirect: true }))

    this.socket.on('msg', (data) => { this.setState({ messages: this.state.messages.concat(data) }) })

    this.socket.on('roomFull', (bool) => { this.setState({show: !bool}) })

  }

  //Handler for the link url box
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

  //Handlers for showing link bar
  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleTimer = (msg, data) => {
    console.log(msg)
  }

  myTime = () => {}
  theirTime = () => {}

  render() {

    return (
      <div className="wrapper">
        <div className="room-2col">
          <Modal
            show={this.state.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header>
              <Modal.Title>Send This Link</Modal.Title>
            </Modal.Header>

            <Modal.Body>{window.location.href}</Modal.Body>
          </Modal>

          {this.state.rematch && <Rematch username={this.state.username}
                                          room={this.props.match.url.split('/')[2]}
                                          allData={this.state.allData}/>}
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
      </div>
    );
  }
}

export default Room;
