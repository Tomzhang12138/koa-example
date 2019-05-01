const { config: MysqlConfig } = require('./mysql')
const { config: CookieConfig } = require('./cookie')
const { config: TipConfig } = require('./tip')

module.exports = {
    MysqlConfig,
    CookieConfig,
    port: 3016,
    TipConfig
}