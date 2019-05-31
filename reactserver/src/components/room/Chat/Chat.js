import React, { Component } from 'react';
import Message from './Message.js';
import Chatbar from './Chatbar.js'


function Chat(props) {



  const list = props.messages.map(e => {
    return <Message 
      key = { e.id }
      content = { e }
    />
  })


  return (
    <div className="chat-container">
      <div className="message-area">
        {list}
      </div>
    <Chatbar addNewMessage={props.addNewMessage} />
  </div>
  )
}

export default Chat;
