const { java } = require('dubbo2.js')
const config = require('./config')

const testDubbo = config.createDubbo('test', {
  Hello (who) {
    return [
      java.String(who)
    ]
  }
})

module.exports = testDubbo