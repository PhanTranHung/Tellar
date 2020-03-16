let md5 = require('md5');
let excuter = require('./Excuter');


class user {
  constructor(username, email, pass, friends, cover_image_url) {
    this.username = username;
    this.email = email;
    this.pass = pass;

    if (cover_image_url)
      this.cover_image_url = cover_image_url;
    else
      this.cover_image_url = null;

    if (friends)
      this.friends = friends;
    else
      this.friends = [];
  }

  get getUsername() {
    return this.username;
  }

  get getEmail() {
    return this.email;
  }

  validPassword(pass) {
    return pass === this.pass;
  }

  dataValues() {
    return md5(this.username + this.pass);
  }

  get getCover() {
    return this.cover_image_url;
  }

  set setCover(image_url) {
    this.cover_image_url = image_url
  }
}

let data = excuter.readData('users.json')
let users = renderUser(data);

function renderUser(data) {
  let a, temp = {};
  for (a in data) {
    temp[a] = new user(data[a].username, data[a].email, data[a].pass, data[a].friends, data[a].cover_image_url);
  }
  return temp;
}

// setup User models and its fields.

function findOneUser(username) {
  if (username in users) {
    return users[username];
  }
  return false
}

/**
 *
 * @param {string} username
 * @param {string} email
 * @param {string} pass
 * @param {boolean | null} save or not
 */
function createOneUser(username, email, pass, save) {
  users[username] = new user(username, email, pass);
  if (save)
    excuter.writeData(JSON.stringify(users), 'users.json');
}

// export User models for use in other files.
exports = module.exports;
exports.findOneUser = findOneUser;
exports.createOneUser = createOneUser;