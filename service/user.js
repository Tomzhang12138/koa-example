const { java } = require('dubbo2.js')
const config = require('./config')

const userDubbo = config.createDubbo('user', {
  SearchUser (username) {
    return [
      java.String(username)
    ]
  }
})

module.exports = userDubbo