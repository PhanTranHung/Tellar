// let users = {};
let md5 = require('md5');
let users = {};


class user {
    constructor(username, email, pass){
        this.username = username;
        this.email = email;
        this.pass = pass;
    }

    get getUsername(){
        return this.username;
    }

    get getEmail(){
        return this.email;
    }

    validPassword(pass){
        return pass === this.pass;
    }

    dataValues () {
        return md5(this.username + this.pass);
    }
}

// setup User models and its fields.
/**
 * @param {dictionary} users
 */
function User() {
}

function findOneUser(username){
    if (username in users){
        return users[username];
    }
    return false
}

function createOneUser(username, email, pass){
    users[username] = new user(username, email, pass);
}
// export User models for use in other files.
exports = module.exports = User;
exports.findOneUser = findOneUser;
exports.createOneUser = createOneUser;