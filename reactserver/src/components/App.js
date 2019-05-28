import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.js';
import Login from './login/Login.js'
import Room from './room/Room.js'

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id="wrapper">
        <Navbar />
        {/* <Login /> */}
        <Room />
      </div>
    );
  }
}

export default App;
