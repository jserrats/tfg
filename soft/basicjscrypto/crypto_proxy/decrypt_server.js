const net = require('net');
const crypto = require('crypto');
const fs = require('fs');

// tunnel exit
var wstream = fs.createWriteStream('test.png');

password = '01234567';

cipher = crypto.createDecipher('aes-256-ecb', password);

net.createServer(function (sock) {
    sock.pipe(cipher).pipe(wstream);

    sock.on('close', function (data) {
        wstream.end();
        console.log("Message received.")
    });
}).listen(5678);