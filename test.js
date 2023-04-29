const User = require('./User')
const Session = require('./Session')

// const session = new Session("remy123", "4567")

Session.signup("remy123", "4567")

const userSession = new Session("remy123", "4567")
userSession.login()

userSession.follow("percy123")
userSession.follow("Tim")

userSession.logout()
userSession.follow("Meg1234")

// console.log(User.users)
