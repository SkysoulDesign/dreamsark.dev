var http    = require('http'),
    ioRedis = require('ioredis')({
        port: process.env.REGIS_PORT_6379_TCP_PORT,
        host: process.env.REGIS_PORT_6379_TCP_ADDR
    }),
    socket  = require('socket.io')(http);

var app = http.createServer();
app.listen(8080);

var socket = require('socket.io')(app);
socket.on('connection', function(e){
    console.log('socket connected');
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
