const Koa = require('koa')
const convert = require('koa-convert')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const cors = require('koa2-cors')
const { ApolloServer, gql } = require('apollo-server-koa')

const typeDefs = gql(require('./graphql/typeDefs'))
const resolvers = require('./graphql/resolvers')

const logger = require('./middleware/log')

const { MysqlConfig, CookieConfig, port } = require('./config')

const home = require('./router/index')
const todo = require('./router/todo')

const app = new Koa()

const staticPath = './static'

const store = new MysqlSession({
    user: MysqlConfig.user,
    password: MysqlConfig.password,
    database: MysqlConfig.database,
    host: MysqlConfig.host
})

app.use(cors())

app.use(static(path.join(__dirname, staticPath)))

app.use(bodyParser())

app.use(convert(logger()))

app.use(session({
    key: 'session-id',
    store,
    CookieConfig
}))

let router = new Router()

router.use('/index', home.routes(), home.allowedMethods())
router.use('/todo', todo.routes(), todo.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

const server = new ApolloServer({typeDefs, resolvers})

server.applyMiddleware({app})

app.listen({port}, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`)
})