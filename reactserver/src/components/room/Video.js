import React from 'react';


function Video() {


  return (
    <body onload="my_init()">

      <div id="otherClients">
      </div>

      <video  style={{float:"left"}} id="self" width="300" height="200">
      </video>

      <div style={{position:"relative", float:"left", width:"300px"}}>
        <video id="caller" width="300" height="200"></video>
      </div>

  </body>
  )
}

export default Video;
