var crypto = require('crypto');
password = 'asdfe';

//https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation

function encrypt(text) {
    var cipher = crypto.createCipher('aes-256-ecb', password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher('aes-256-ecb', password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

message = "01234567890123456789012345678901234567890123456";
var hw = encrypt(message);
console.log('Original message: ' + message);
console.log('Encrypted message: ' + hw.toString());
console.log('Decrypted message: ' + decrypt(hw));