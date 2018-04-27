const bcrypt = require('bcrypt');
const readline = require('readline'), rl = readline.createInterface(process.stdin, process.stdout);

stored_hash = '';

function ask_something(to_ask) {
    return new Promise((resolve) => {
        rl.question(to_ask, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {

    const password = await ask_something('Write a password to be saved: ');

    bcrypt.hash(password, 10, function (err, hash) {
        stored_hash = hash;
    });

    const new_password = await ask_something('Now write the password to login: ');

    console.log("The bcrypt stored is: " + stored_hash);

    bcrypt.compare(new_password, stored_hash, function (err, res) {

        if (res) {
            console.log("The passwords are the same, log in!")
        } else {
            console.log("The passwords are diferent")
        }
    });
    rl.close();
    process.stdin.destroy();
}


main();


