import React from 'react';


function Draw(props) {

  return (
    <div onClick={props.handleDrawClick} className="draw">
      <img src={require('./images/draw.png')} alt=""/>
    </div>
  );
}

export default Draw;
