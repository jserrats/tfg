// openssl genrsa -out certs/server/my-server.key.pem 2048
// openssl rsa -in certs/source/my-source.key.pem -pubout -out certs/destination/my-source.pub
var fs = require('fs');
const NodeRSA = require('node-rsa');

private_key = new NodeRSA(fs.readFileSync('key.priv'));
public_key = new NodeRSA(fs.readFileSync('key.pub'));


data = "testaedaedaedae";

console.log(private_key.decrypt(public_key.encrypt(data, 'base64'), 'utf8'));

signed = private_key.sign(data, 'base64');

console.log(public_key.verify(data, signed, 'utf8', 'base64'));