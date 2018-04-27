const crypto = require('crypto');

function print_auth() {
    let timestamp = Math.round((new Date()).getTime() / 1000);
    if ((timestamp % 30) === 0) {
        let auth = crypto.createHash('sha256').update(timestamp + seed).digest('hex').substr(0, 6);
        console.log(auth);
    }
}

seed = "prova";
setInterval(print_auth, 1000);