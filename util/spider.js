const Crawler = require('crawler')

const Spider = new Crawler({
    callback: function(error, res, done) {
        if (error) {
           return false
        }
        let $ = res.$
        done()
    }
})

module.exports = {
    spider: (url, params, callback) => {
        let querystring = '?'
        for (let key in params) {
            querystring += `${key}=${params[key]}&`
        }
        querystring = querystring.substr(0, querystring.length - 2)
        Spider.queue([{
            uri: url + querystring,
            jQuery: false,
            callback
        }])
    }
}