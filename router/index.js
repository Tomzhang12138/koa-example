const combineRoutes = require('koa-combine-routers')

const home = require('./home')
const todo = require('./todo')
const jue = require('./juejin')

module.exports = combineRoutes(home, todo, jue)