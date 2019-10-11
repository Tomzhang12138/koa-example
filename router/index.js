const combineRoutes = require('koa-combine-routers')

const home = require('./home')
const todo = require('./todo')

module.exports = combineRoutes(home, todo)