import React, { Component, Fragment } from 'react';



class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props)
    return (
      <Fragment>
        <div className={this.props.content.id ? 'talkbubble-1 messages' : "talkbubble-2 messages"}><p>{this.props.content.content}</p></div>
      </Fragment>
    )
  }
}

export default Message;
