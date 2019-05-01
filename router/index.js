const Router = require('koa-router')
const path = require('path')
const { render } = require('../util/render')
const { uploadFile } = require('../util/upload')
const { getSessionList } = require('../model/index')

let home = new Router()

home.get('/', async (ctx) => {
    ctx.cookies.set(
        'cid', 
        'hello world',
        {
          domain: 'localhost',  // 写cookie所在的域名
          path: '/index',       // 写cookie所在的路径
          maxAge: 10 * 60 * 1000, // cookie有效时长
          expires: new Date('2017-02-15'),  // cookie失效时间
          httpOnly: false,  // 是否只用于http请求中获取
          overwrite: false  // 是否允许重写
        }
      )
    ctx.body = await render('index.html')
})

home.get('/set', async (ctx) => {
    ctx.session = {
        user_id: Math.random().toString(36).substr(2),
        count: 0
      }
      ctx.body = ctx.session
})

home.get('/get', async (ctx) => {
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
})

home.post('/', async (ctx) => {
    ctx.body =  ctx.request.body
})

home.get('/upload', async (ctx) => {
    ctx.body = await render('upload.html')
})

home.post('/upload', async (ctx) => {
    let result = { success: false }
    let serverFilePath = path.join( __dirname, '../uploadFiles' )
    result = await uploadFile( ctx, {
      fileType: 'album', 
      filePath: serverFilePath
    })
    ctx.body = result
})

home.get('/session', async (ctx) => {
  let list = await getSessionList()
  ctx.body = list
})

module.exports = home