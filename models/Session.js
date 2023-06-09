const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')

class Session {

  static currentSession = null;

  constructor(user) {
    this.user = user
    this.isLoggedin = false;
    this.newsfeed = [];
    this.comments = []
  }

  static login(username, password) {

    const user = User.users.find(u => u.username === username && u.password === password);

    if (user) {
      // set the session
      Session.currentSession = new Session(user);
      this.isLoggedin = true
      console.log(`User ${username} logged in successfully`)
    } else {
      console.error(`Invalid username or password.`);
    }
  }

  static logout() {
    // this.isLoggedIn = false;
    Session.currentSession = null;
    console.log(`User logged out successfully.`);
  }

  // signup static method
  static signup(username, password) {
    const newUser = new User(username, password);
    newUser.signup();
    this.isLoggedin = true
    console.log(`User ${username} has been created successfully.`);

    Session.login(username, password)
  }

  follow(username) {
    if (Session.currentSession) {
      const userToFollow = User.users.find(user => user.username === username);
      if (userToFollow) {
        this.user.follow(userToFollow);
        console.log(`${this.user.username} is now following ${userToFollow.username}.`);
      } else {
        console.error(`Could not find user ${username} to follow.`);
      }
    } else {
      console.error('User is not logged in.');
    }
  }

  unfollow(username) {
    if (this.isLoggedin) {
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
  postItem(content) {
    if (Session.currentSession !== null) {
      const post = new Post(content, this.user.username);
      this.newsfeed.push(post);
      console.log(`User ${this.user.username} posted: ${content}`)
    } else {
      console.error('User not logged in');

    }
  }

  // upvote post
  upvotePost(postId) {
    const post = this.newsfeed.find((post) => post.id === postId)
    // const currentUser = this.user.username
    if (Session.currentSession) {
      if (!post.upvotedUsers.includes(this.user.username)) {
        post.upvotedUsers.push(this.user.username);
        post.upvote()
        console.log(`User ${this.user.username} upvoted the post with ID ${post.id}`);
      } else {
        console.log(`User ${this.user.username} already upvoted the post with ID ${post.id}`);
      }
      // post.upvote();

    } else {
      console.error("User not logged in lalal");
    }
    // console.log(post.upvotedUsers);
  }

  // downvote post
  downvotePost(postId) {
    const post = this.newsfeed.find((post) => post.id === postId)
    if (Session.currentSession) {
      // post.downvote();
      if (!post.downvotedUsers.includes(this.user)) {
        post.downvotedUsers.push(this.user);
        post.downvote();
        console.log(`User ${this.user.username} downvoted the post with ID ${post.id}`);
      } else {
        console.log(`User ${this.user.username} already downvoted the post with ID ${post.id}`);
      }

    } else {
      console.error("User not logged in");
    }
  }
  // add comment to a post
  comment(postId, reply) {
    const post = this.newsfeed.find((post) => post.id === postId)
    if (Session.currentSession) {
      // post.comments.push(reply);
      const newComment = new Comment(reply, this.user, postId);
      post.addComment(newComment);
      console.log(`User ${this.user.username} commented on the post with ID ${post.id}`);
    } else {
      console.error("User not logged in");
    }
  }

  // reply to a comment on a post
  addReply(commentId, replyText, postId) {
    if (!Session.currentSession) {
      console.log("You must be logged in to reply to a comment");
      return;
    }
    const currentUser = Session.currentSession.user;
    // const comment = this.comments.find((c) => c.id === commentId);
    const post = this.newsfeed.find(post => post.id === postId);
    const comment = post.comments.find(comment => comment.id === commentId);
    if (!comment) {
      console.log(`Comment with id ${commentId} not found`);
      return;
    }
    const reply = new Comment(replyText, currentUser, commentId);

    // comment.addReply(reply.text);
    comment.replies.push(reply);
    console.log(`${reply.text} added to comment with id ${commentId}`);
  }


  //get news feed sorted by some properties
  // we are using default params

  getNewsFeed(sortBy = "mostRecent") {
    if (Session.currentSession) {
      const sortedFeed = this.newsfeed.sort((a, b) => {
        if (sortBy === "mostRecent") {
          return b.timestamp - a.timestamp;
        } else if (sortBy === "mostUpvoted") {
          return b.upvotes.length - a.upvotes.length;
        } else if (sortBy === "mostCommented") {
          return b.comments.length - a.comments.length;
        }
      });
      console.log(`News feed for user ${this.user.username} sorted by ${sortBy}`)
      sortedFeed.forEach(post => console.log(post))
    } else {
      console.error("User not logged in");
    }
  }


}
module.exports = Session;




