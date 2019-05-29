import React, { Component } from 'react';import { bind } from 'bluebird';

import './Login.css'



class Login extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
    };
    this.setClass = this.setClass.bind(this);
  }

  setClass() {
    const currentState = this.state.isClicked;
    this.setState({ isClicked: !currentState });
  }  

  render() {
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

            <button className={this.state.active ? 'active' : null} onClick={this.setClass} >Login</button>
            <button className="">Register</button>

            <form>
              <input className="form-input" type="text" placeholder="Username" />
              {/* <input className="form-input" type="text" placeholder="Email" /> */}
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
