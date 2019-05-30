import React, { Component } from 'react';import { bind } from 'bluebird';
import './Login.css';
import axios from 'axios'
const axiosOptions = {
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "http://localhost:3000"
  },
  withCredentials: true
}

function sendLogin(username, password) {
  const data = JSON.stringify({ username, password })
  axios.post('http://localhost:3001/login', data, axiosOptions).then(console.log).catch(console.error);
}

function sendRegister(username, password, email) {
  const data = JSON.stringify({ username, password, email })
  axios.post('http://localhost:3001/register', data, axiosOptions).then(console.log).catch(console.error);
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
    };
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }

  onLoginClick(e) {
    this.setState({
      login:true
    })
  }

  onRegisterClick(e) {
    this.setState({
      login:false
    })
  }

  render() {
    const isLogin = this.state.login
    let form;

    if (!isLogin) {
      form = <input className="form-input" type="text" placeholder="Email" />
    }

    return (
      <div id="login-grid">
        <div id="login-left-side">
          <h2>Playing Chess With Video</h2>
          <p>ceteros nam. Recusabo indoctum scriptorem ei ius, qui cu autem cotidieque. In per tale velit. Mei mandamus salutandi complectitur te. Nec ea possit mentitum verterem, at mea errem forensibus mnesarchum.</p>
        </div>

        <div id="login-right-side">
          <div>
            <h1>Let's Play Some Chess</h1>
          </div>
          <div id="inner-inner-grid">

            <button className={this.state.login ? 'active' : null} onClick={this.onLoginClick} >Login</button>
            <button className={!this.state.login ? 'active' : null} onClick={this.onRegisterClick}>Register</button>

            <form>
              <input className="form-input" type="text" placeholder="Username" />
              {form}
              <input className="form-input" type="password" placeholder="Password" />
              <input id="submit-btn" type="submit" placeholder="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
