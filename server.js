var express = require('express');
var io = require('socket-io');

var app = express();
app.use(express.static('assets'));
app.listen(9999);

// // Voting
io.listen(app);
io.sockets.on("connection", function(socket) {
  socket.on("vote", function(data) {
    socket.emit("result", data);
  });
});
