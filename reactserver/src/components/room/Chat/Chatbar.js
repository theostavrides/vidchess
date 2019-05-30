import React, { Component } from 'react';


class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.props.addNewMessage(this.state.content)
      this.setState({content: ""})
    }
  }

  handleInput = (event) => {
    this.setState({
      content: event.target.value
    })
  }

 render() {
    return (
      <div className="chatbar-container">
        <form className="chatbar">
          <input
            onKeyPress={this.handleEnter}
            onChange={this.handleInput}
            type="text"
            placeholder="Write your message"
          />
        </form>
      </div>
    )
  }
}

export default Chatbar;
