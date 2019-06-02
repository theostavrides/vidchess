import React, { Component } from 'react';


class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  onClickOption() {

  }


  render() {
    return (
      <div className="option">
        <div className="accept"><img src={require('./images/yes.png')} /></div>
        <div className="decline"><img src={require('./images/no.png')} /></div>
      </div>
    );
  }
}

export default Option;