import React, { Component } from 'react';
import './Login.css'



class Login extends Component {
  constructor() {
    super();
    this.state = {};
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

            <button className="btn">Login</button>
            <button className="btn left-btn">Register</button>

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
