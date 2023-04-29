const User = require('./User');

class Session {
  constructor(username, password) {
    // this.user = new User(username, password);
    this.user = new User(username, password);
    this.isLoggedIn = false;
    this.newsfeed=[];
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
  // postItem to the wall
  postItem(content){
    if(this.isLoggedIn){
      const post=new Post(content, this.user);
      this.newsfeed.push(post);
      console.log(`User ${this.user.username} posted: ${content}`)
    }else{
      console.error('User not logged in');
      
    }
  }

  // upvote post
  upvotePost(post){
    if(this.isLoggedIn){
      post.upvote();
      console.log(`User ${this.user.username} upvoted the post with ID ${post.id}`);
    }else{
      console.error("User not logged in");
    }
  }

  // downvote post
  downvotePost(post){
    if(this.isLoggedIn){
      post.downvote();
      console.log(`User ${this.user.username} downvoted the post with ID ${post.id}`);
    }else{
      console.error("User not logged in");
    }
  }

  //get news feed sorted by some properties
  // we are using default properties 
  
  getNewsFeed(sortBy="mostRecent") {
    if(this.isLoggedIn){
      const sortedFeed=this.newsfeed.sort((a,b)=>{
        if(sortBy==="mostRecent"){
          return b.timestamp-a.timestamp;
        }else if(sortBy==="mostUpvoted"){
          return b.upvotes.length-a.upvotes.length;
        }else if(sortBy==="mostCommented"){
           return b.comments.length-a.comments.length;   
        }
      });
      console.log(`News feed for user ${this.user.username} sorted by ${sortBy}`)
      sortedFeed.forEach(post=>console.log(post))
    }else{
      console.error("User not logged in");
    }
  }
  
  static signup(username, password) {
    const newUser = new User(username, password);
    newUser.signup();
    return newUser;
  }
}
module.exports = Session;




