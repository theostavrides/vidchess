import React, { Component } from 'react';
import axios from 'axios'
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
      roomData: '',
      gameData: '',
      opponentUsername: '',
      myVictories: '',
      theirVictories: ''

    }
  }
// creator: "theo"
// creator_victories: 1
// current_game: 91
// games_completed: 2
// id: 17
// start_color: "w"
// time_per_move: 15
// timestamp: "2019-06-02T07:15:03.685Z"
// url: "MUa8mfDdEI"
  componentDidMount(){

    //make a server route for getting
    axios.get(`http://localhost:3001/rooms/${this.props.room}`, axiosOptions)
      .then( res => this.setState({roomData: res.data}))
      .then(axios.get(`http://localhost:3001/games/91`)
        .then(res => this.setState({gameData: res.data})))
        .then(axios.get(``))


  }

  render() {
    const boxStyle = {
      'zIndex': '1000',
      'position': 'absolute',
      'backgroundColor': 'white',
      'height': '400px',
      'width': '400px'

    }
    return (
      <h1 style={boxStyle}> {this.props.username} {this.props.room} </h1>

    )
  }
}

export default Rematch;
