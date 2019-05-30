import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.js';
import Login from './login/Login.js'
import Home from './home/Home.js'
import Room from './room/Room.js'
import { BrowserRouter as Router, Redirect, Route, Link, withRouter } from "react-router-dom";
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

  }


  login = () => {
    this.setState({logged: true})
  }

  render() {
    return (
      <div id="wrapper">
        <Navbar />
         <Router>
          <Route path='/rooms/:room' component={Room} />
          {this.state.logged && <Route exact path='/' component={Home} />}
          {!this.state.logged && <Route exact path='/' render={() => <Login login={this.login}/>} /> }
        </Router>
      </div>
    );
  }
}

export default App;
