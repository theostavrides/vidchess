import React from 'react';


function Resign (props) {

    return (
      <div onClick={props.handleResignClick} className="resign">
        <img src={require('./images/resign.png')} alt="" />
      </div>
    );
}

export default Resign;
