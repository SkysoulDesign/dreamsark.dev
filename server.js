var http = require('http'),
    ioRedis = require('ioredis')({
        port: process.env.REGIS_PORT_6379_TCP_PORT,
        host: process.env.REGIS_PORT_6379_TCP_ADDR
    });

var app = http.createServer()
    app.listen(3333, function () {
    console.log('Listening on Port 3333');
});

var socket = require('socket.io')(app);
    socket.on('connection', function (socket) {
        console.log('connected');
    });

/**
 * Subscript to redis
 */
ioRedis.subscribe("payment", function (error, count) {
    console.log('error? ' + error);
    console.log('count? ' + count);
});

ioRedis.on('message', function (channel, message) {

    console.log(channel)
    console.log(message);

    message = JSON.parse(message);
    socket.emit(channel + ':' + message.event, message.data);

});

