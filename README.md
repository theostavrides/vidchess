# vidchess
The first online chess app that allows players to stream video and audio with their opponents while playing.

Contributors: [Theo Stavrides](https://github.com/theostavrides) and [Tom Wenner](https://github.com/thmswenner)

## Project Status
Basic functionality implemented - full version to be deployed in late 2019.

## Installation 
1. Download this repository
2. Download and install PostgreSQL if you don't have it already 
3. Create a database for the project - call it 'vidchess', and check the 
   knexfile.js in the server/ folder to make sure it is pointing to the correct path. ``` connection:'postgres://localhost/vidchess'```
4. Navigate into the server/ folder and do a ```npm install``` followed by a ```npm start``` to start the server.
5. Repeat step 4 in the RTCserver/ folder.
6. Repeat step 4 in the reactserver/ folder.
7. Go to localhost:3000 to use the app.

## Screenshots
<img src="https://raw.githubusercontent.com/theostavrides/vidchess/master/screenshots/room.png" 
     height="350px"/>

<img src="https://raw.githubusercontent.com/theostavrides/vidchess/master/screenshots/login.png" 
     height="350px"/>

<img src="https://raw.githubusercontent.com/theostavrides/vidchess/master/screenshots/home.png" 
     height="350px"/>

## Built With
- Node.js 
- Express
- React
- WebRTC
- Socket.io
- PostgreSQL
