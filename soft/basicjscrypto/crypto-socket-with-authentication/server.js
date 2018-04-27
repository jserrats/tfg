const net = require('net');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');
const bcrypt = require('bcrypt');

pseudoDB = {};

user = "user1";
password = "qwerty";
authenticator_seed = "prova";

last_timestamp = 0;

bcrypt.hash(password, 10, function (err, hash) {
    pseudoDB[user] = {hash: hash, auth: authenticator_seed};
    console.log("[*] I've created a entry in the local DB for the user: " + user);
});


const private_key = new NodeRSA("-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIEpAIBAAKCAQEA5Pj6KM2pClmVUWLc4/N+NdJSf50VI8Ylm6yXl4tNCkZadQbb\n" +
    "PeCKupFStPW9UsVJRSzED2WbaccaGjy/g858mUX6qXlkDGhv5t+UlzrBB6RAsEQh\n" +
    "k+9f+NSSAlRIsj545fOxBt8bp+nyrRib2kaTQpteECyMW/tWRDiUxI3IfMMXCGRR\n" +
    "7bkUjU/eMFf7YIC58Y3IQUDGlWaIsoJ8Bg9YOUYg9f7W3yjhAqrAfjuIgi5exs4S\n" +
    "A8a/WX5TwrUXaBOCIxTopJdi8qvL9yhppoDEHVYpITFpWNiz5wiiWtkh4cw6yo9v\n" +
    "9jbsO1s2qGSrzaw84Q0O0WUPnyHliugamTV9FwIDAQABAoIBAFC87lDW/AU3Q2yY\n" +
    "RLVoVZea2xY+iIa9xuMWv7ljGD5IQntDeKlf9OsGdThz8lcuU8C9oUCgnmV1HGIm\n" +
    "C43pkIvnXhTGRh4N8W9iZR3STOBp7Zl53LEyVhACvJ1vpNadKrpC7Kg0oaba2oRo\n" +
    "ygP0oNZ6vHdNjgydGnUh0mtgZ1J+OW8KMHNsUUhIqvU6lsc8d53P93POaKiRrV4n\n" +
    "7fewaH43FRyLc8jSAUB371fS6+vOBzSeNorcBCN+lS4URenvDxv1QyYn58spBShL\n" +
    "Cj79oiw0XtYdsmb+3yVNzpoQyPfLT4lwG6WC0BzhZVP/pdgRlQRHABjo45X/tKgy\n" +
    "XuXMRhECgYEA9M64dbZ3/eO7QIDcLS9GIXGcShBHkWGAF1F4QxI/JxXpkAZhxehg\n" +
    "G1YScipNcRfVuUar5v23YpdpVZmcAWmndrz9ZEbAIiXrbVq1bGLKzncGtjwesa6N\n" +
    "PP39Ik8FwxtbnW/UDKVOjGQ3xWb31Rt4sUQrfUf0OwkPV3m0Fyz7wm8CgYEA73Dr\n" +
    "0ZuDGu6NY/WiVZxk5JR223V99e0CPPXKiLe+mSGBVIg6Xoots9KI6OPOrWFlV3iy\n" +
    "Dr2rrAmJq1LP/mgYQvoC7Ad825R6Q89k+EHGAnrNIKWXNCxsm60RyyJD6RwoaoVD\n" +
    "nMU7ZYbZ3EZuwcMOp6cSmGUmSuZZ3g/idOGPo9kCgYEAg3e8keKi/+LbvaE2HMHl\n" +
    "fLJhh1jExmtA+cTTu9lBtwDKhIEY4sqPSj7n+w2Ctzhgm3Y7fPpGEJlVhRXQNOYD\n" +
    "e/20arSgG/aXPwvWoFVRqp07KoSQy0T9LoML/O/JHWVExwC2NPBVhYmQdd99OqHd\n" +
    "J/1/CXGp1EZiSczfDQ8oSNsCgYEArNkpg0DuHe0DqJtTutWRh+kc/EQO0A9uRC9z\n" +
    "K8rpDoY/ZJSK/mBlqaBcMTLyqfrbO4/nifimCyU/eqvndlIS4Za1sUmeeqzurjDz\n" +
    "RLvGg1e+6MhhJMrFBISliayMtaUcD/lv26YNwLbeYsN9hOaYl7JmHBk40W0EhueU\n" +
    "pKeIF9ECgYAeIALr5AxksYHtk/ai/0whnD7Utsv+t0xuZlCng0EXPIMSqEWECjvY\n" +
    "GCWkmcQGmr8uwDdgLPUgJWJLJ9qt/042e97PZLILNWyedpmRUiRWb8XQ9IZ5pJlk\n" +
    "i0klI3Xc/cqNdlgd1i7RJMkIl650OhgUCgz7tGhQszVNuSyrav9rZA==\n" +
    "-----END RSA PRIVATE KEY-----\n");

const public_key = "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5Pj6KM2pClmVUWLc4/N+\n" +
    "NdJSf50VI8Ylm6yXl4tNCkZadQbbPeCKupFStPW9UsVJRSzED2WbaccaGjy/g858\n" +
    "mUX6qXlkDGhv5t+UlzrBB6RAsEQhk+9f+NSSAlRIsj545fOxBt8bp+nyrRib2kaT\n" +
    "QpteECyMW/tWRDiUxI3IfMMXCGRR7bkUjU/eMFf7YIC58Y3IQUDGlWaIsoJ8Bg9Y\n" +
    "OUYg9f7W3yjhAqrAfjuIgi5exs4SA8a/WX5TwrUXaBOCIxTopJdi8qvL9yhppoDE\n" +
    "HVYpITFpWNiz5wiiWtkh4cw6yo9v9jbsO1s2qGSrzaw84Q0O0WUPnyHliugamTV9\n" +
    "FwIDAQAB\n" +
    "-----END PUBLIC KEY-----";

net.createServer(async function (client) {
    client.write(public_key);
    log(client, "I've sent my public RSA key to the client");
    client.once('data', async function (data) {
        const AESkey = private_key.decrypt(data.toString(), 'utf8');
        const decipher = crypto.createDecipher('aes-256-ecb', AESkey);
        const cipher = crypto.createCipher('aes-256-ecb', AESkey);

        log(client, "I've recieved the AES symmetric key. It is " + AESkey);

        client.pipe(decipher);
        cipher.pipe(client);

        decipher.once('data', async function (data) {
            const credentials = JSON.parse(data.toString());
            if (await login(credentials, client)) {
                log(client, "User logged in!");

                decipher.pipe(process.stdout);
                process.stdin.pipe(cipher);

            } else {
                log(client, "User credentials incorrect");
                client.destroy();
            }
        });
    });
}).listen(5678);


async function login(credentials, client) {
    log(client, "The user is trying to log in with" +
        "\n\tUser: " + credentials.user +
        "\n\tPassword: " + credentials.password +
        "\n\tAuthenticator: " + credentials.authenticator);

    let user_info = pseudoDB[credentials.user];

    if (user_info === undefined) {
        log(client, "User not found");
        return false
    }

    let correct_password = await bcrypt.compare(credentials.password, user_info.hash);
    let correct_authenticator = check_authenticator(user_info.auth, credentials.authenticator);

    if (!correct_password) {
        log(client, "Wrong password");
        return false;
    } else if (!correct_authenticator) {
        log(client, "Wrong authenticator");
        return false;
    } else {
        return true;
    }
}

function check_authenticator(seed, authenticator) {
    return crypto.createHash('sha256').update(last_timestamp.toString() + seed).digest('hex').substr(0, 6) === authenticator;
}

function log(socket, text) {
    console.log("[+] " + socket.remote + " " + socket.remotePort + " | " + text)
}

setInterval(function () {
    let timestamp = Math.round((new Date()).getTime() / 1000);
    if ((timestamp % 30) === 0) {
        last_timestamp = timestamp;
    }
}, 1000);