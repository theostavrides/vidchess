import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="home-2col-grid">
        <div className="left-grid">
          <h1>Create A Game</h1>
          <form className="new-game">
            <input type="radio" id="1" name="minute" />
            <label htmlFor="1">1</label>
            <input type="radio" id="2" name="minute" />
            <label htmlFor="2">3</label>
            <input type="radio" id="3" name="minute" />
            <label htmlFor="3">5</label>
            <input type="radio" id="4" name="minute" />
            <label htmlFor="4">10</label>
            <input type="radio" id="5" name="minute" />
            <label htmlFor="5">15</label>

            <div className="piece-color">
              <input type="radio" id="white" name="piece" />
              <label htmlFor="white">W</label>
              <input type="radio" id="random" name="piece" />
              <label htmlFor="random">R</label>
              <input type="radio" id="black" name="piece" />
              <label htmlFor="black">B</label>
            </div>
            <div className="get-link">
              <input className="link-btn" type="submit" value="Get Link" />
            </div>
          </form>
        </div>

        <div className="right-grid">
          <h1 className="your-stats">Your Stats</h1>
          <div className="game-stats">
            <ul className="game-outcome">
              <li>
                <img className="game-icon" src="./checkmark.png" alt="" />
                <p><strong>You</strong> won against <strong>Them</strong></p>
              </li>

              <li>
                <img className="game-icon" src="./checkmark.png" alt="" />
                <p><strong>You</strong> lost against <strong>Them</strong></p>
              </li>

              <li>
                <img className="game-icon" src="./checkmark.png" alt="" />
                <p><strong>You</strong> had a draw with <strong>Them</strong></p>
              </li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
