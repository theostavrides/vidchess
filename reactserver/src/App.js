import React, { Component } from 'react';
import './App.css';
import Room from './room/Room';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Room />
    );
  }
}

export default App;
