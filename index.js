const Koa = require('koa')
const convert = require('koa-convert')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const jsonp = require('koa-jsonp')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const cors = require('koa2-cors')
const middleCompose = require('koa-compose')
const compress = require('koa-compress')
const { ApolloServer, gql } = require('apollo-server-koa')

const typeDefs = gql(require('./graphql/typeDefs'))
const resolvers = require('./graphql/resolvers')

const logger = require('./middleware/log')
const valid = require('./middleware/valid')

const { MysqlConfig, CookieConfig, port, corsHost } = require('./config')

const routeConfig = require('./router')

const app = new Koa()

const staticPath = './static'

const store = new MysqlSession({
    user: MysqlConfig.user,
    password: MysqlConfig.password,
    database: MysqlConfig.database,
    host: MysqlConfig.host
})

let middleware = middleCompose([
    cors({
        origin: (ctx) => {
            if (corsHost.indexOf(ctx.request.header.origin) !== -1) {
                return `${ctx.request.header.origin}`
            }
            return false
        },
        credentials: true
    }),
    static(path.join(__dirname, staticPath)),
    bodyParser(),
    compress(),
    convert(logger()),
    jsonp(),
    session({
        key: 'session-id',
        store,
        cookie: CookieConfig
    }),
    convert(valid())
])

app.use(middleware)

app.use(routeConfig())

const server = new ApolloServer({typeDefs, resolvers})

server.applyMiddleware({app})

app.listen({port}, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`)
})