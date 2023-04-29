// const Auth=require('../utils/Auth');

const users=[];

class User {
  constructor(username, password) {
    this.username=username
    this.password = password;
    this.following =[];
  }

  // singup method
  signup() {
    // validate username and password
    if(this.username && this.password){
      // check is username is unique
      if(User.isUsernameAvailable(this.username)){
        // create a new user account
        users.push(this)

        console.log(`User ${this.username} created successfully`)
      }else{
        console.error(`Username ${this.username} is already taken`)
      }
    }else{
      console.error('Username and password are required')
    }
  }

  login(){
    // find user by username and password
    const user=users.findUserByUsernameAndPassword(this.username, this.password)
    if(user){
      console.log(`Welcome back, ${user.username}!`)
      return user;
    }else{
      console.error(`Invalid username or password`)
      return null
    }
  }
  
  follow(user){

  
    // check if user is already following
    if(this.following.indexOf(user)==-1){
      // add user to following array
      this.following.push(user)
      console.log(`${this.username} is now following ${user.username}`)
    }else{
      console.error(`${this.username} is already following ${user.username}`)
    }
  }

  unfollow(user){
    // check if the user is being followed
    const index=this.following.indexOf(user)
    if(index!==0){
      // remove user from following array
      this.following.splice(index, 1)
      console.log(`${this.username} is no longer following ${user.username}`)
    
    }else{
      console.log(`${this.username} is already not following ${user.username}`)
    }
  }

  // some helper methods
  static isUsernameAvailable(username){
    // check if username exists or not
    return !users.some(user=>user.username==username)
  }

  // findUserByUsername and password
  static findUserByUsernameAndPassword(username, password){
    return users.find(user=>user.username==username && user.password==password)
  }
}




module.exports={User,users};



