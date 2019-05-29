import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.js';
import Login from './login/Login.js'
import Home from './home/Home.js'
import Room from './room/Room.js'
import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";
import axios from 'axios'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }
  componentDidMount(){
    // axios.get('http://localhost:3001/auth')
    //   .then(function (response) {
    //       console.log(response.data);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    const data = JSON.stringify({
      username: 'theo',
      password: 'purple-monkey-dinosaur'
    })

    axios.post('http://localhost:3001/login', data, {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "http://localhost:3000"
        },
        withCredentials: true
    }).then(res => console.log(res)).catch(e => console.log(e));
  }
  render() {
    return (
      <div id="wrapper">
        <Navbar />
        <Router>
          <Route path='/:room' component={Room} />
          {this.state.logged && <Route path='/' component={Home} />}
          {!this.state.logged && <Route path='/' component={Login} />}
        </Router>
      </div>
    );
  }
}

export default App;
