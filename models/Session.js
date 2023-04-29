const User = require('./User');

class Session {
  constructor(username, password) {
    // this.user = new User(username, password);
    this.user = new User(username, password);
    this.isLoggedIn = false;
  }

  login() {
    if (this.user.login()) {
      this.isLoggedIn = true;
      console.log(`User ${this.user.username} is now logged in.`);
    } else {
      console.error(`Failed to login as user ${this.user.username}.`);
    }
  }

  logout() {
    this.isLoggedIn = false;
    console.log(`User ${this.user.username} is now logged out.`);
  }

  follow(username) {
    if (this.isLoggedIn) {
      const userToFollow = User.users.find(user => user.username === username);
      if (userToFollow) {
        this.user.follow(userToFollow);
      } else {
        console.error(`Could not find user ${username} to follow.`);
      }
    } else {
      console.error('User is not logged in.');
    }
  }

  unfollow(username) {
    if (this.isLoggedIn) {
      const userToUnfollow = User.users.find(user => user.username === username);
      if (userToUnfollow) {
        this.user.unfollow(userToUnfollow);
      } else {
        console.error(`Could not find user ${username} to unfollow.`);
      }
    } else {
      console.error('User is not logged in.');
    }
  }

  static signup(username, password) {
    const newUser = new User(username, password);
    newUser.signup();
    return newUser;
  }
}
module.exports = Session;




