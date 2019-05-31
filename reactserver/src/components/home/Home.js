import React, { Component, Fragment } from 'react';
import './Home.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router';


const axiosOptions = {
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "http://localhost:3000"
  },
  withCredentials: true
}

function newLink(time, color) {
  const data = JSON.stringify({ time, color })
  return axios.post('http://localhost:3001/newLink', data, axiosOptions);
}




class Home extends Component {
  constructor() {
    super();
    this.state = {
      time: '',
      color: '',
      redirect: false,
      url: ''
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
    if (this.state.time === '' || this.state.color === '') return
    newLink(this.state.time, this.state.color)
      .then( res => this.setState({ redirect: true, url: res.data }));
  }


  render() {
    const { redirect, url } = this.state;

    if (redirect) {
      return <Redirect to={/rooms/ + this.state.url}/>;
    }

    return (
      <div className="home-2col-grid">
        <div className="left-grid">
          <h1>Create A Game</h1>
          <div className="new-game">
            {
              [1, 3, 5, 10, 15].map((n, i) => {
                return (
                  <Fragment>
                    <input onChange={this.handleChangeTime} key={i} value={n} type="radio" id={i} name="minute" />
                    <label className="time" htmlFor={i}>{n}min</label>
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
                    <label className="piece-container" htmlFor={c}> <img className="color" src={require(`./images/${c}.png`)} /> </label>
                  </Fragment>
                )
              })
            }
            </div>

            <div className="get-link">
              <input onClick={this.handleClickSubmit} className="link-btn" type="submit" value="Get Link" />
            </div>
          </div>
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
