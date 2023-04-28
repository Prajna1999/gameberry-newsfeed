class Comment {
  constructor(text, user, postId) {
    this.id = Math.floor(Math.random() * 1000);
    this.text = text;
    this.user = user;
    this.timestamp = Date.now();
    this.postId = postId;
    this.upvotes = 0;
    this.downvotes = 0;
  }

  upvote() {
    // Increment the upvotes for the comment
  }

  downvote() {
    // Decrement the downvotes for the comment
  }
}

module.exports = Comment;
