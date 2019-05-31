import React from 'react';


function Option() {

  return (
    <div className="option">
      <div className="yes-btn"><img src={require('./images/yes.png')} /></div>
      <div className="no-btn"><img src={require('./images/no.png')} /></div>
    </div>
  );
}

export default Option;