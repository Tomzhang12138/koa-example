const Router = require('koa-router')
const { jueQuery } = require('../model/request')

let jue = new Router()

const routerPath = '/jue'

const categoryList = ['recommend', 'backend', 'frontend', 'android', 'ios', 'ai', 'tools', 'codeLife', 'read']

const orderList = ['POPULAR', 'NEWEST', 'WEEKLY_HOTTEST', 'THREE_DAYS_HOTTEST', 'MONTHLY_HOTTEST', 'HOTTEST']

jue.get(`${routerPath}`, async (ctx) => {
  let { category = 'recommend', order = 'POPULAR', tags } = ctx.query
  category = categoryList.indexOf(category) !== -1 ? category : categoryList[0]
  order = orderList.indexOf(order) !== -1 ? order : orderList[0]
  let res = await jueQuery({ order, category, tags })
    if (res.status) {
      ctx.response.status = res.status
      ctx.body = res.data
    } else {
      ctx.body = res
    }
})

module.exports = jue

