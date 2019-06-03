import React, { Component } from 'react';
import Draw from './Draw.js'
import Resign from './Resign.js'
import Option from './Option.js'
import './Chessbar.css'


class Chessbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResignClicked: false,
      isDrawClicked: false,
    };
  }

  handleResignClick = () => {
    this.setState({isResignClicked: true, isDrawClicked: false})

  }

  handleDrawClick = () => {
    this.setState({isResignClicked: false, isDrawClicked: true})
  }

  convertSeconds = (time) => {
    const minute = Math.floor(time / 60);
    let seconds = time - (minute * 60);
    seconds = Math.round(seconds * 100) / 100;

    let timer = (minute < 10 ? "0" + minute : minute);
    timer += ":" + (seconds < 10 ? "0" + seconds : seconds);
    return timer
  }

  render() {
    const isResignClicked = this.state.isResignClicked;
    const isDrawClicked = this.state.isDrawClicked;
    let resignOptionButton;
    let drawOptionButton;

    if (isResignClicked) {
      resignOptionButton = <Option />
    } else if (isDrawClicked) {
      drawOptionButton = <Option />
    }

    return (
      <div className="chessbar-container">

        <div className="timer player1">
          <div className="player-time">P1</div>
          <div>{this.convertSeconds(this.props.myTime)}</div>
        </div>

        <div className="timer player2">
          <div className="player-time">P2</div>
          <div>{this.convertSeconds(this.props.theirTime)}</div>
        </div>

        {!isResignClicked && <Resign handleResignClick={this.handleResignClick}/>}
        {resignOptionButton}
        {!isDrawClicked && <Draw handleDrawClick={this.handleDrawClick}/>}
        {drawOptionButton}
      </div>
    );
  }
}

export default Chessbar;
