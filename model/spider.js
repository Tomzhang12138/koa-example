const { spider } = require('../util/spider')
const { searchImgUrl, TipConfig } = require('../config')

module.exports = {
    searchImg: (title) => {
        return new Promise((resolve, reject) => {
            let params = {
                tn: 'resultjson_com',
                ipn: 'rj',
                queryWord: encodeURIComponent(title),
                word: encodeURIComponent(title),
                pn: 2
            }
            spider(searchImgUrl, params, (error, res, done) => {
                if (error) {
                    resolve({
                        status: 404,
                        data: TipConfig['api10003']
                    })
                } else {
                    let imgList = []
                    let data = JSON.parse(res.body).data
                    data.forEach(item => {
                        imgList.push({
                            name: item.fromPageTitleEnc,
                            src: item.middleURL
                        })
                    })
                    resolve(imgList)
                    done()
                }
            })
        })
    }
}