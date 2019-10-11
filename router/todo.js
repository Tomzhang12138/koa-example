const Router = require('koa-router')
const { render } = require('../util/render')

let todo = new Router()

const routerPath = '/todo/'

todo.get(`${routerPath}`, async (ctx) => {
    ctx.body = await render('todo.html')
})

module.exports = todo