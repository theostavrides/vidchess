import React, { Component } from 'react';


class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  // Handles hitting enter event
  handleEnter = (event) => {
    if (event.key === "Enter") {
      // take this line out after setting up Axios
      event.preventDefault();
      this.props.addNewMessage(this.state)
      this.setState({content: ""})
    }
  }

  // Sets state from the chatbar input
  handleInput = (event) => {
    this.setState({
      content: event.target.value,
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
            value={this.state.content}
          />
        </form>
      </div>
    )
  }
}

export default Chatbar;
