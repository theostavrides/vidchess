import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';



class LinkModal extends Component {
  constructor() {
    super();
    this.state = {
      link: '',
      isCopied: false
    };
  }

  onClickCopy = (event) => {
    this.textArea.select();
    document.execCommand('copy');
    this.setState({isCopied: true})
  }


  render () {
    return (
      <Modal
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
        centered>

        <Modal.Header>
          <Modal.Title>Send This Link</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <div id="box">
            {this.state.isCopied ? <div class="was-copied"><img src={require('./chessbar/images/yes.png')} /></div> : null}
            <input
              ref={(input) => this.textArea = input}
              value={window.location.href}
            />
            <Button onClick={this.onClickCopy}>Copy</Button>
            </div>
          </Modal.Body>

      </Modal>
    )
  }
}

export default LinkModal;
