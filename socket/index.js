let io = require('socket.io')({pingTimeout: 5000});

let chatRoomNsp = io.of('/chat-room').on('connection', function (socket) {

  socket.on('new msg', function (data) {
    console.log(data);
  });

  socket.on('client_send_chat_msg', function (data) {
    console.log(data);
    chatRoomNsp.emit('server_send_chat_msg', data);
  });

  socket.on('client_sign_up', function (data) {
    // if (!data in users){
    //   console.log('not in')
    // }
  });

  socket.on('disconnect', function () {
    console.log("User disconnected");
  });
});


let listFriend = io.of('/friend').on('connect', socket => {
  socket.on('disconnect', () => {
    console.log("User disconnected");
  });

  socket.on('client-get-friends', () => {

  });
});

/**
 * @returns {io|server}
 */
function socket() {
  return io;
}

module.exports = socket;