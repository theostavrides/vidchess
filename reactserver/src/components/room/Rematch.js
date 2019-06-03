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
  }

  componentDidMount(){


  }

  render() {
    const boxStyle = {
      'zIndex': '1000',
      'position': 'absolute',
      'backgroundColor': 'white',
      'height': '400px',
      'width': '400px'

    }

    let { black_username, white_username, gameData, roomData } = this.props.allData;

    const room = this.props.room;

    const me = this.props.username;
    black_username = black_username.username;
    white_username = white_username.username;
    const them = (me === black_username) ? white_username : black_username;


    console.log(me, them)
    const blackid = gameData.black_id;
    const whiteid = gameData.white_id;

    const result = gameData.result;

    const creator_victories = roomData.creator_victories;
    const guest_victories = roomData.games_completed - roomData.creator_victories;

    const start_color = roomData.start_color;
    const time_per_move = roomData.time_per_move;




    if (result === 'w') {

    }

    if (result === 'b') {

    }

    if (result === 'd') {

    }


    console.log(this.props.allData)
    return (
      <h1 style={boxStyle}> {me} </h1>

    )
  }
}

export default Rematch;
