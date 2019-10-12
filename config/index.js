const { config: MysqlConfig } = require('./mysql')
const { config: CookieConfig } = require('./cookie')
const { config: TipConfig } = require('./tip')
const { config: NoValidConfig } = require('./noValid')

module.exports = {
    MysqlConfig,
    CookieConfig,
    port: 3016,
    corsHost: ['http://localhost:3012', 'http://localhost:3015'],
    TipConfig,
    NoValidConfig,
    searchImgUrl: 'https://image.baidu.com/search/acjson',
    jueQueryUrl: 'https://web-api.juejin.im/query'
}