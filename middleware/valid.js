const { TipConfig, NoValidConfig } = require('../config')

module.exports = function() {
    return function * (next) {
        let session = this.session
        let apiPath = this.url
        if (NoValidConfig.api.findIndex(path => new RegExp(path).test(apiPath)) !== -1 || (session && session.isLogin)) {
            yield next
        } else {
            this.response.status = 403
            this.body = TipConfig['api10002']
        }
    }
}