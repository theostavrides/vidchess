import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div class="home-2col-grid">
        <div class="left-grid">
          <h1>Create A Game</h1>
          <form class="new-game">
            <input type="radio" id="1" name="minute" />
            <label for="1">1</label>
            <input type="radio" id="2" name="minute" />
            <label for="2">3</label>
            <input type="radio" id="3" name="minute" />
            <label for="3">5</label>
            <input type="radio" id="4" name="minute" />
            <label for="4">10</label>
            <input type="radio" id="5" name="minute" />
            <label for="5">15</label>

            <div class="piece-color">
              <input type="radio" id="white" name="piece" />
              <label for="white">W</label>
              <input type="radio" id="random" name="piece" />
              <label for="random">R</label>
              <input type="radio" id="black" name="piece" />
              <label for="black">B</label>
            </div>
            <div class="get-link">
              <input class="link-btn" type="submit" value="Get Link" />
            </div>
          </form>
        </div>

        <div class="right-grid">
          <h1 class="your-stats">Your Stats</h1>
          <div class="game-stats">
            <ul class="game-outcome">
              <li>
                <img class="game-icon" src="./checkmark.png" alt="" />
                <p><strong>You</strong> won against <strong>Them</strong></p>
              </li>

              <li>
                <img class="game-icon" src="./checkmark.png" alt="" />
                <p><strong>You</strong> lost against <strong>Them</strong></p>
              </li>

              <li>
                <img class="game-icon" src="./checkmark.png" alt="" />
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
