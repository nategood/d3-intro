var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(80);

// Servers up our static html files (more of the examples)
app.use(express.static('assets'));

// Voting
io.sockets.on("connection", function(socket) {
  socket.on("vote", function(data) {
    io.sockets.emit("result", data);
  });
});