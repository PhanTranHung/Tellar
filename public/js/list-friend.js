$(document).ready(function () {
  let socket = io('/friend');

  function getListFriend(){
    socket.emit(' client-get-friends');
  }

  socket.on('get-list-friend', function (data) {
    socket.emit();
    console.log(data);

    let obj = JSON.parse(data);

    // let cover = obj.cover

  });
});


