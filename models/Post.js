class Post {
  constructor(text, user) {
    this.text = text;
    this.timestamp = Date.now();
    this.upvotes = 0;
    this.downvotes = 0;
    this.comments = [];
    this.user = user;
  }

  add_comment(comment) {
    // implement later
  }

  upvote() {
    // implement later
  }

  downvote() {
    // implement later
  }
}
