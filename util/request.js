const request = require('request')

module.exports = {
    get: (url, params, onSuccess, onError) => {
        request({
            url,
            method: 'GET',
            headers: {
                'X-Agent': 'Juejin/Web'
            },
            json: true,
            qs: params
        }, (error, res) => {
            if (error) {
                onError(error)
                return
            }
            onSuccess(res)
        })
    },
    post: (url, data, onSuccess, onError) => {
        request({
            url,
            method: 'POST',
            headers: {
                'X-Agent': 'Juejin/Web'
            },
            json: true,
            body: data
        }, (error, res) => {
            if (error) {
                onError(error)
                return
            }
            onSuccess(res)
        })
    }
}