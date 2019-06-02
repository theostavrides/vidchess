import React, { Component } from 'react';


class Rematch extends Component {
  constructor(props){
    super(props);
  }


  render() {
    const boxStyle = {
      'z-index': '1000',
      'position': 'absolute',
      'background-color': 'white',
      'height': '400px',
      'width': '400px'

    }
    return (
      <h1 style={boxStyle}> Rematch Box </h1>
    )
  }
}

export default Rematch;
