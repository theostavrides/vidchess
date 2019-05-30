import React, { Component, Fragment } from 'react';
import './Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      time: '',
      color: '',
    };
  }

  handleChangeTime = (event) => {
    this.setState({
      time: event.target.value
    })
  }

  handleChangeColor = (event) => {
    this.setState({
      color: event.target.value
    })
  }

  handleClickSubmit = (event) => {
    event.preventDefault();
  }


  render() {
    return (
      <div className="home-2col-grid">
        <div className="left-grid">
          <h1>Create A Game</h1>
          <form className="new-game">
            {
              [1, 3, 5, 10, 15].map((n, i) => {
                return (
                  <Fragment>
                    <input onChange={this.handleChangeTime} key={i} value={n} type="radio" id={i} name="minute" />
                    <label htmlFor={i}>{n} min</label>
                  </Fragment>
                )
              })
            }
            <div className="piece-color">
            {
              ['w', 'r', 'b'].map((c, i) => {
                return (
                  <Fragment>
                    <input onChange={this.handleChangeColor} key={i} value={c} type="radio" id={c} name="piece" />
                    <label htmlFor={c}> <img src="{require(`./${c}.png`)}" /> </label>
                  </Fragment>
                )
              })
            }
            </div>

            <div className="get-link">
              <input onClick={this.handleClickSubmit} className="link-btn" type="submit" value="Get Link" />
            </div>
          </form>
        </div>

        <div className="right-grid">
          <h1 className="your-stats">Your Stats</h1>
          <div className="game-stats">
            <ul className="game-outcome">
              <li>
                <img className="game-icon" src={require('./images/checkmark.png')} alt="" />
                <p><strong>You</strong> won against <strong>Them</strong></p>
              </li>

              <li>
                <img className="game-icon" src={require('./images/loss.png')} alt="" />
                <p><strong>You</strong> lost against <strong>Them</strong></p>
              </li>

              <li>
                <img className="game-icon" src={require('./images/draw.png')} />
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
