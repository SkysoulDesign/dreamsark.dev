var http    = require('http'),
    ioRedis = require('ioredis')({
        port: process.env.REGIS_PORT_6379_TCP_PORT,
        host: process.env.REGIS_PORT_6379_TCP_ADDR
    }),
    socket  = require('socket.io')(http);

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

http.createServer().listen(8080);