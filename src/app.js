const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/index')

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./api/routes')(app);
app.use(function (err, req, res, next) {
    console.error({
        url: req.url,
        params: req.params,
        body: req.body,
    });
    res.send({ error: err.message });
});

server = app.listen(config.port)
console.log(`Server started on port ${config.port}`)

const io = require("socket.io")(server)

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})