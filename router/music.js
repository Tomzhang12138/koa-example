const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const request = require('../util/request')
let Music = new Router()

const special = {
    'daily_signin.js': '/daily_signin',
    'fm_trash.js': '/fm_trash',
    'personal_fm.js': '/personal_fm'
}

fs.readdirSync(path.join(__dirname, '../musicApi')).reverse().forEach(file => {
    if(!(/\.js$/i.test(file))) return
    let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
    let question = require(path.join(__dirname, '../musicApi', file))
    Music.get(route, async (ctx) => {
        let query = Object.assign({}, ctx.query, ctx.body, {cookie: ctx.cookies.get('music')})
        console.log(query)
        let answer = await question(query, request)
        console.log(answer.cookie)
        // ctx.cookies.set('music', answer.cookie)
        ctx.response.status = answer.status
        ctx.body = answer.body
    })
})

module.exports = Music