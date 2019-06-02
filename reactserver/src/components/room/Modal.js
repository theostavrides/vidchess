import React, {Component} from 'react';


class Modal extends Component {
  constructor() {
    super();
    this.state = {
      link: ''
    };
  }


  render () {
    return (
      <div className="link-container">
        <div className="link-header">
          <h3>Send this link to a Friend...Or Enemy</h3>
        </div>
        <div className="link-box">
          <p contenteditable="true">{window.location.href}</p>
        </div>
      </div>
    )
  }
}

export default Modal;
