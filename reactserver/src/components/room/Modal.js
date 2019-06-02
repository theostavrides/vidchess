import React from 'react';


function Modal() {


  return (
    <div className="link-container">
      <div className="link-header">
        <h3>Send this link to a Friend...Or Enemy</h3>
      </div>
      <div className="link-box">
        <p contenteditable="true"></p>
      </div>
    </div>
  )
}

export default Modal;
