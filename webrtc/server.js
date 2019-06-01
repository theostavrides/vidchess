// Load required modules
var https   = require("https");
var fs      = require("fs");
var express = require("express");
var io      = require("socket.io");
var easyrtc = require("easyrtc");
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));
var webServer = https.createServer({
    key:  fs.readFileSync("./certs/79875048_www.vidchess.com.key"),
    cert: fs.readFileSync("./certs/79875048_www.vidchess.com.cert")
}, httpApp);
var socketServer = io.listen(webServer, {"log level":1}); // Start Socket.io so it attaches itself to Express server

var rtc = easyrtc.listen(httpApp, socketServer); // EasyRTC server



webServer.listen(8080, function () {
    console.log('listening on https://192.168.88.98:8080');
});


//helllloooo