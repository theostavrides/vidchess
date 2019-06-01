function my_init() {
  //Set the callback that will be invoked when the list of people logged in changes.
  easyrtc.setRoomOccupantListener(loggedInListener);

  easyrtc.enableAudio(true); //set to false to disable audio
  easyrtc.enableVideo(true); //set to false to disable video
  //code from source: easyrtc.easyApp = function(applicationName, monitorVideoId, videoIds, onReady, onFailure)
  easyrtc.easyApp("Company_Chat_Line", "self", ["caller"], // "self" and "caller" refer to HTML ids
    function(myId) {
      console.log("My easyrtcid is " + myId);
    }
  );


}

function loggedInListener(roomName, otherPeers, selfInto) {
  console.log('#### ROOM NAME #####', roomName) // "Most applications can ignore the roomName parameter; it is only of interest if your application can access several rooms simultaneously"
  console.log('#### OTHER PEERS #####', otherPeers)
  console.log('#### SELF INFO #####', selfInto)
  var otherClientDiv = document.getElementById('otherClients');
  while (otherClientDiv.hasChildNodes()) {
    otherClientDiv.removeChild(otherClientDiv.lastChild);
  }
  for(var i in otherPeers) {
    var button = document.createElement('button');
    button.onclick = function(easyrtcid) {
      return function() {
        performCall(easyrtcid);
      }
    }(i); //sneaky little i here passes in the otherPeerId

    label = document.createTextNode(i);
    button.appendChild(label);
    otherClientDiv.appendChild(button);
  }
}

function performCall(easyrtcid) {
  //this.call = function(otherUser, callSuccessCB, callFailureCB, wasAcceptedCB, streamNames)
  easyrtc.call(
    easyrtcid,
    function(easyrtcid) { console.log("completed call to " + easyrtcid);},
    function(errorMessage) { console.log("err:" + errorMessage);},
    function(accepted, bywho) {
      console.log((accepted?"accepted":"rejected")+ " by " + bywho);

    }
  );
}

var socket = io.connect('https://192.168.88.164:8080/');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});







