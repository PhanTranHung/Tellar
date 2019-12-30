$(document).ready(function () {
  let socket = io('/chat-room');
  // if (sessionStorage.getItem('username') == undefined)
  //   location.replace("login");
  let my_name = Math.random() * 10 + Math.random() * 10;

  let poster = $('#post_msg');
  let msg_area = $('#msg_area');
  let wrap_able = $('#wrap_able');
  // let my_name = sessionStorage.getItem('username');

  // socket.emit('client_sign_up', my_name);

  poster.keypress(function (e) {
    if (e.keyCode === 13) {
      e.preventDefault(); // prevents page reloading
      let val = poster.val().trim();
      if (val !== '') {
        let data = JSON.stringify({'username': my_name, 'msg': poster.val()});
        socket.emit('client_send_chat_msg', data);
        poster.val('');
        return false;
      }
    }
  });

  let msg_friend_begin = `<div class="line_text"><div class="friend-msg align_l"><div class="content_msg">`;
  let msg_me_begin = `<div class="line_text"><div class="my-msg align_r"><div class="content_msg">`
  let msg_end = `</div></div></div>`;

  socket.on('server_send_chat_msg', function (data) {
    console.log(data);

    let obj = JSON.parse(data);
    if (obj.username === my_name)
      msg_area.append(msg_me_begin + obj.msg + msg_end);
    else
      msg_area.append(msg_friend_begin + obj.msg + msg_end);
    wrap_able.stop().animate({scrollTop: wrap_able[0].scrollHeight}, 100);
  });
});