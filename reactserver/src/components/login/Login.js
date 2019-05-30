import React, { Component } from 'react';import { bind } from 'bluebird';
import './Login.css';
import axios from 'axios'

function sendLogin(username, password) {
  const data = JSON.stringify({ username, password })

  axios.post('http://localhost:3001/login', data, {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:3000"
    },
    withCredentials: true
  }).then(res => console.log(res)).catch(e => console.log(e));
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
      username: '',
      email: '',
      password: ''
    };
  }

  onLoginClick = (event) => {
    this.setState({
      login:true
    })
  }

  onRegisterClick = (event) => {
    this.setState({
      login:false
    })
  }


  handleUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmitLogin = (event) => {
    event.preventDefault();
  }


  handleSubmitRegister = (event) => {
    event.preventDefault();
  }



  render() {
    const isLogin = this.state.login
    let form;

    if (!isLogin) {
      form = <input onKeyPress={this.handleEmail} className="form-input" name="password" type="text" placeholder="Email" />
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
              <input
                onChange={this.handleUsername}
                name="username"
                className="form-input"
                type="text"
                placeholder="Username"
              />
              {form}
              <input 
                onChange={this.handlePassword}
                name="password"
                className="form-input"
                type="password"
                placeholder="Password"
              />
              <input
                onClick={isLogin ? this.handleSubmitLogin : this.handleSubmitRegister}
                id="submit-btn"
                type="submit"
                placeholder="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
