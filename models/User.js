class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.follows = new Set();
  }
 
}
module.exports=User;



