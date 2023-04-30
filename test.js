const User = require('./models/User')
const Session = require('./models/Session')

Session.login("percy123", "1234")

// Session.currentSession.follow("Tormund")
Session.currentSession.postItem("Just setting up my app")




// upvote post
// Session.currentSession.upvotePost(1)

// logout session
// Session.logout()
// Session.currentSession.upvotePost(1)

Session.currentSession.postItem("Fooling around")

// print newsfeed
Session.currentSession.getNewsFeed()

// Session.currentSession.upvotePost(1)

// Session.currentSession.downvotePost(1)






