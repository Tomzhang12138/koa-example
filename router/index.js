const combineRoutes = require('koa-combine-routers')

const home = require('./home')
const todo = require('./todo')
const jue = require('./juejin')
const img = require('./img')

module.exports = combineRoutes(home, todo, jue, img)
