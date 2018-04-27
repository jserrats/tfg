const net = require('net');
const crypto = require('crypto');

last_timestamp = 0;
seed = "prova";

net.createServer(function (sock) {
    console.log('New destination');
    sock.on('data', function (data) {
        data = data.toString().substr(0, data.length - 1);
        if (crypto.createHash('sha256').update(last_timestamp + seed).digest('hex').substr(0, 6) === data) {
            sock.write('Authentication correct!\n');
        }
        else {
            sock.write('Wrong!\n');
        }
    });
    sock.on('close', function (data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
}).listen(1234);

setInterval(function () {
    let timestamp = Math.round((new Date()).getTime() / 1000);
    if ((timestamp % 30) === 0) {
        last_timestamp = timestamp;
    }
}, 1000);