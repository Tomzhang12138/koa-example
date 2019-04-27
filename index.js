const Koa = require('koa')
const { ApolloServer, gql } = require('apollo-server-koa')
const convert = require('koa-convert')
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const logger = require('./middleware/log')

const home = require('./router/index')
const todo = require('./router/todo')

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

let router = new Router()

router.use('/index', home.routes(), home.allowedMethods())
router.use('/todo', todo.routes(), todo.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

const users = [
    {
        name: 'zyw',
        sex: '男',
        intro: '博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3',
        skills: ['Linux','Java','nodeJs','前端'],
    },
    {
        name: 'James',
        sex: '男',
        intro: 'zyw',
        skills: ['Linux','Java','nodeJs','前端'],
    }
]

const typeDefs = gql`
    type User {
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    input UserInput {
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    type Query {
        user(id:Int!): User
        users: [User]
    }
    type Mutation {
        addUser(name: String!, sex: String, intro: String, skills: [String]!): User
        addUserByInput(userInfo:UserInput!):User
    }
`

const resolvers = {
    Query: {
        user: function(args, {id}) {
            return users[id || 0]
        },
        users: function() {
            return users
        }
    },
    Mutation: {
        addUser: function(args, {name, sex, intro, skills}) {
            let user = {
                name,
                sex,
                intro,
                skills
            }
            users.push(user)
            return user
        },
        addUserByInput: function(args, {userInfo}) {
            let user = {
                name: userInfo.name,
                sex: userInfo.sex,
                intro: userInfo.intro,
                skills: userInfo.skills
            }
            users.push(user)
            return user
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.applyMiddleware({ app })

app.listen({port: 3015}, () => {
    console.log(`🚀 Server ready at http://localhost:3015${server.graphqlPath}`)
})