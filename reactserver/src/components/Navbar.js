import React, { Component } from 'react';
import './Navbar.css';


class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onClickLogout = (event) => {
    event.preventDefault();
    window.location.href = '/';
  }

  render() {
    return ( 
      <nav>
        <img className="logo" src={require("./vidchess-logo.png")} />
        <h3 onClick={this.onClickLogout} className="logout">Logout</h3>
      </nav>
    );
  }
}

export default Navbar;
