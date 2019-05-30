import React, { Component, Fragment } from 'react';



class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="messages talkbubble-1"><p>{this.props.content}</p></div>
        <div className="messages talkbubble-2"><p>Of course!</p></div>
      </Fragment>
    )
  }
}

export default Message;
