# vidchess
The first online chess app to allows players to stream video and audio with their opponents while playing.
Project makes use of React, WebRTC for video and audio, and Socket.io for the chess and chat components.

## Project Status
Basic functionality implemented - full version to be deployed in late 2019.

## Installation 
1. Download this repository
2. Download and install PostgreSQL if you don't have it already 
3. Create a database for the project - call it 'vidchess', and check the 
   knexfile.js to make sure it is pointing to the correct path. ```js connection:'postgres://localhost/vidchess```
