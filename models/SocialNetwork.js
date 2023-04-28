const Authentication = require('./Auth');
class SocialNetwork {
  constructor() {
    this.users = new Set();
  }
  signup(name, email, password) {
    return Authentication.signup(name, email, password, this.users);
  }
  login(email, password) {
    return Authentication.login(email, password, this.users);
  }
}

module.exports=SocialNetwork;