const Router = require('koa-router')
const path = require('path')
const { render } = require('../util/render')
const { uploadFile } = require('../util/upload')
const { getSessionList, getUserByName } = require('../model/index')
const { searchImg } = require('../model/spider')
const { TipConfig } = require('../config')

let home = new Router()

const routerPath = '/home/'

home.post(`${routerPath}login`, async (ctx) => {
  let username = ctx.request.body.name
  let result = await getUserByName(username)
  if (result) {
    ctx.session = {
      isLogin: true
    }
    ctx.body = {
      token: Math.random().toString(36).substr(2) + new Date().getTime()
    }
    return
  }
  ctx.response.status = 401
  ctx.body = TipConfig['api10001']
})

home.get(`${routerPath}upload`, async (ctx) => {
    ctx.body = await render('upload.html')
})

home.post(`${routerPath}upload`, async (ctx) => {
    let result = { success: false }
    let serverFilePath = path.join( __dirname, '../uploadFiles' )
    result = await uploadFile( ctx, {
      fileType: 'album', 
      filePath: serverFilePath
    })
    ctx.body = result
})

home.get(`${routerPath}session`, async (ctx) => {
  let list = await getSessionList()
  ctx.body = list
})

home.get(`${routerPath}searchImg`, async (ctx) => {
  let title = ctx.query.title
  let res = await searchImg(title)
  if (res.status) {
    ctx.response.status = res.status
    ctx.body = res.data
  } else {
    ctx.body = res
  }
})

module.exports = home