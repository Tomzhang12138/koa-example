const Koa = require('koa')
const convert = require('koa-convert')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const logger = require('./middleware/log')
const app = new Koa()

const staticPath = './static'

const store = new MysqlSession({
    user: 'root',
    password: 'zyw098765.',
    database: 'koa_demo',
    host: '127.0.0.1'
})

let cookie = {
    maxAge: '', // cookie有效时长
    expires: '',  // cookie失效时间
    path: '', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: '', // 是否只用于http请求中获取
    overwrite: '',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: ''
}
  

app.use(static(path.join(__dirname, staticPath)))

app.use(bodyParser())

app.use(convert(logger()))

app.use(session({
    key: 'session-id',
    store,
    cookie
}))

function render (page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./view/${page}`
        fs.readFile(viewUrl, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

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

let todo = new Router()
todo.get('/', async (ctx) => {
    ctx.body = await render('todo.html')
})

let router = new Router()

router.use('/index', home.routes(), home.allowedMethods())
router.use('/todo', todo.routes(), todo.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())



app.listen(3015)