const net = require('net');
const crypto = require('crypto');

// tunnel entrance

password = '01234567';

// this socket will connect to the decrypt server
destination = new net.Socket();
destination.connect(5678, 'localhost');
// this object works as Stream, encrypting the data dat goes through it
cipher = crypto.createCipher('aes-256-ecb', password);

// we create the server that listens to connections
source = net.createServer(function (socket) {
    // the output of the listening socket is piped to the cipher input, and the output of the cipher is sent to the server.
    socket.pipe(cipher).pipe(destination);
}).listen(1234);


