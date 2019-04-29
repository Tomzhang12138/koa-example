const Koa = require('koa')
const convert = require('koa-convert')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const { ApolloServer } = require('apollo-server-koa')

const typeDefs = require('./graphql/typeDef')
const resolvers = require('./graphql/resolver')
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

const server = new ApolloServer({typeDefs, resolvers})

server.applyMiddleware({app})

app.listen({port: 3015}, () => {
    console.log(`🚀 Server ready at http://localhost:3015`)
})