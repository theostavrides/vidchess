import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
const axiosOptions = {
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "http://localhost:3000"
  },
  withCredentials: true
}

class Rematch extends Component {
  constructor(props){
    super(props);
    this.state = {
      me: '',
      myVictories: '',
      them: '',
      theirVictories: '',
      resultSentence: '',
      result: ''
    }
  }

  componentDidMount(){
    let { black_username, white_username, gameData, roomData } = this.props.allData;

    if (gameData) {
      const room = this.props.room;
      const blackid = gameData.black_id;
      const whiteid = gameData.white_id;
      black_username = black_username.username;
      white_username = white_username.username;

      const me = this.props.username;
      const them = (me === black_username) ? white_username : black_username;

      const result = gameData.result;

      const creator_victories = roomData.creator_victories;
      const guest_victories = roomData.games_completed - roomData.creator_victories;

      const myVictories = (me === roomData.creator) ? creator_victories : guest_victories;
      const theirVictories = (them === roomData.creator) ? creator_victories : guest_victories;

      const start_color = roomData.start_color;
      const time_per_move = roomData.time_per_move;


      let resultSentence = 'rwagg'
      if (result === 'w') {
        resultSentence = `${white_username} won the game`;
      } else if (result === 'b') {
        resultSentence = `${black_username} won the game`;
      } else {
        resultSentence = 'The game resulted in a draw';
      }
      this.setState({
        me, myVictories, them, theirVictories, resultSentence, result
      })
      // {resultSentence} {me}{myVictories} - {them}{theirVictories}
    }
  }

  handleRematchRequest = () => {
    this.props.socket.emit('rematchRequest', this.props.allData)
  }

  render() {

    return (
      <Modal
      show={this.props.rematch}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>
          {this.state.resultSentence}
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <h4>{this.state.me}</h4>
          <p>{this.state.myVictories} - {this.state.theirVictories}</p>
          <h4>{this.state.them}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleRematchRequest}>Rematch</Button>
          <Button>Go Home</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Rematch;
