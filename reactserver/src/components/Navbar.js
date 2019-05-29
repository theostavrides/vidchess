import React, { Component } from 'react';
import './Navbar.css';


class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <nav>
        <h4 className="logo">vidchess</h4>
        <h3 className="logout">Logout</h3>
      </nav>
    );
  }
}

export default Navbar;
