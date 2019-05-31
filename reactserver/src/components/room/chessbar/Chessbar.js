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
        <div className="timer player1">00.00</div>
        <div className="timer player2">00.00</div>
        {!isResignClicked && <Resign handleResignClick={this.handleResignClick}/>}
        {resignOptionButton}
        {!isDrawClicked && <Draw handleDrawClick={this.handleDrawClick}/>}
        {drawOptionButton}
      </div>
    );
  }
}

export default Chessbar;
