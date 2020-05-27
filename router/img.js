const Router = require('koa-router')
const { searchImg } = require('../model/spider')

let imgRouter = new Router()

imgRouter.get('/search', async (ctx) => {
    let title = ctx.query.title
    let res = await searchImg(title)
    if (res.status) {
        ctx.response.status = res.status
        ctx.body = res.data
    } else {
        ctx.body = res
    }
})

module.exports = imgRouter