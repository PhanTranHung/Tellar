let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const PORT = process.env.PORT || 9650;

app.use(express.static(__dirname + "/public"));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.listen(PORT, function () {

});

app.get('/', function (req, res) {
   res.render('index');
});

app.get('/call', function (req, res) {
    res.render('videocall');
});