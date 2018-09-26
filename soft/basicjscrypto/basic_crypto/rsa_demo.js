var fs = require('fs');
const NodeRSA = require('node-rsa');

private_key = new NodeRSA(fs.readFileSync('key.priv'));
public_key = new NodeRSA(fs.readFileSync('key.pub'));


data = "testing asymmetric encryption";


encrypted_data = public_key.encrypt(data, 'base64');
console.log('Encryoted data: ' + encrypted_data);
console.log('Decrypted data: ' + private_key.decrypt(encrypted_data, 'utf8'));

signed = private_key.sign(data, 'base64');

if (public_key.verify(data, signed, 'utf8', 'base64')){
    console.log('The data was signed with our key');
}
