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
      rematch: true,
      allData: {}
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

      this.socket.on('msg', (data) => {
        this.setState({ messages: this.state.messages.concat(data) })
      })

  }

  //BRINGS UP REMATCH BOX
  setRematch = (data) => {
    this.setState({ allData: data})
    this.setState({ rematch: true })
  }

  addNewMessage = (content) => {
    const hearOwnMessage = (data) => {
      data.id = null
      this.setState({ messages: this.state.messages.concat(data) })
    }
    this.socket.emit('chat', content, hearOwnMessage);
  }

  joinRoom = (username) => {
    const room = this.props.match.url.split('/')[2];
    this.socket.emit('joinRoom', { room, username });
    this.socket.on('message', console.log);
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {

    return (
      <div className="wrapper">
        <div className="room-2col">
          <Modal
            show={this.state.show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title>Send This Link</Modal.Title>
            </Modal.Header>
              <Modal.Body>{window.location.href}</Modal.Body>
              </Modal>
          {this.state.rematch && <Rematch username={this.state.username}
                                          room={this.props.match.url.split('/')[2]}
                                          allData={this.state.allData}/>}
          <div className="chessboard-container">
              {/* <div className="link-container">
                <div className="link-header">
                  <h3>Send this link to a Friend...Or Enemy</h3>
                </div>
                <div className="link-box">
                  <p contenteditable="true">This is how we do it</p>
                </div>
              </div> */}
            <Board room={this.props.match.url.split('/')[2]}
                   socket={this.socket}
                   updateGameData={this.updateGameData}
                   updateBoardData={this.updateBoardData}
                   setRematch={this.setRematch}/>
          </div>
          <div className="sidebar">
            <div className="video-container">
              <Video />
            </div>
            <Chessbar />
            <Chat addNewMessage={this.addNewMessage} messages={this.state.messages} />
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
