import React, { Component } from 'react';


class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptClick: false,
      declineClick: false
    };
  }

  onClickAccept() {

  }

  onClickDecline() {

  }

  render() {
    return (
      <div className="option">
        <div onClick={this.onClickAccept} className="accept"><img src={require('./images/yes.png')} /></div>
        <div onClick={this.onClickDecline} className="decline"><img src={require('./images/no.png')} /></div>
      </div>
    );
  }
}

export default Option;