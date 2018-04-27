const net = require('net');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');
const readline = require('readline'), rl = readline.createInterface(process.stdin, process.stdout);

// Must have node 8 or higher installed


function ask_something(to_ask) {
    return new Promise((resolve) => {
        rl.question(to_ask, (answer) => {
            resolve(answer);
        });
    });
}


function exchange_keys(data) {
    const server_public_key = NodeRSA(data.toString());
    console.log("Server's public key recieved.");
    proxy.write(server_public_key.encrypt(AESkey, 'base64'));
}

const AESkey = '01234567';
const decipher = crypto.createDecipher('aes-256-ecb', AESkey);
const cipher = crypto.createCipher('aes-256-ecb', AESkey);

decipher.on('error', function () {
    console.log("Connection closed, incorrect credentials");
    process.exit(0)
});

proxy = new net.Socket();
proxy.connect(5678, 'localhost');

proxy.once('data', async function (proxy_public_key) {
    exchange_keys(proxy_public_key);

    let credentials = {
        user: await ask_something("User: "),
        password: await ask_something("Password: "),
        authenticator: await ask_something("Authenticator: ")
    };
    rl.close();

    cipher.pipe(proxy);
    let serialized = JSON.stringify(credentials);
    //adding a padding, so that we reach AES block minimum
    cipher.write(serialized + " ".repeat(128 - serialized.length));

    proxy.pipe(decipher).pipe(process.stdout);
    process.stdin.pipe(cipher).pipe(proxy);

});

