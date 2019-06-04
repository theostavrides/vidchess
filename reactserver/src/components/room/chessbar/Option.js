import React, { Component } from 'react';


class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="option">
        <div onClick={this.props.handleAcceptClick} className="accept"><img src={require('./images/yes.png')} /></div>
        <div onClick={this.props.handleDeclineClick} className="decline"><img src={require('./images/no.png')} /></div>
      </div>
    );
  }
}

export default Option;