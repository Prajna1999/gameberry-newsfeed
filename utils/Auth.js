const User = require('../models/User');
const users = new Set()

class Authentication {
  static login(email, password, users) {
    for (const user of users) {
      if (user.email === email && user.password === password) {
        return user;
      }
    }
    return null;
  }

  static signup(name, email, password, users) {
    const newUser = new User(name, email, password);
    users.add(newUser);
    return newUser;
  }
}

module.exports = Authentication