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
split = hw.toString().length / 2;
console.log("Message is " + message.length + " bytes long. " +
    "Encrypted is " + hw.toString().length + " chars or " + hw.length /2 + "bytes");
console.log(hw, "\n" + hw.substr(0, split), "\n" + hw.substr(split));
console.log(decrypt(hw));