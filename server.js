let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const PORT = process.env.PORT || 9650;

app.use(express.static(__dirname + "/public"));
app.set('views', 'views');
app.set('view engine', 'ejs');

http.listen(PORT, function () {
    console.log("The server running on port:", PORT);
});

app.get('/', function (req, res) {
   res.render('index');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/videocall', function (req, res) {
    res.render('videocall');
});

let users = [];

io.on('connection', function (socket) {
    console.log('A user connected');
    
    socket.on('disconnect', function () {
        console.log("User disconnected");
    });

    socket.on('client_send_chat_msg', function (data) {
        console.log(data);
        io.sockets.emit('server_send_chat_msg',data);
    });

    socket.on('client_sign_up', function (data) {
        if (!data in users){
            console.log('not in')
        }
    });

});

