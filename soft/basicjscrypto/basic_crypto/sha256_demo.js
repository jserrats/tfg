// import the nodejs standard library "crypto"
const crypto = require('crypto');


function print_hash(message) {
    console.log("\nMessage: " + message +
        "\nHASH: " + crypto.createHash('sha256').update(message).digest('hex'))
}

print_hash("Bob owes me 100$");
print_hash("Bob owes me 900$");

console.log("\nThere are " + Math.pow(2, 256) + " possible sha256 outputs. Collisions are possible but very unlikely");