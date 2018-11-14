const Cryptr = require('cryptr');
const cryptr = new Cryptr('YFpoGQ@$VrUMf64tZ9eg^RiaQSZ^Pw%*');

function encrypt (text) {
    try {
        return cryptr.encrypt(text);
    } catch (err) {
        throw err
    }
}

function decrypt (text) {
    try {
        return cryptr.decrypt(text);
    } catch (err) {
        throw err
    }
}

module.exports = { decrypt, encrypt };
