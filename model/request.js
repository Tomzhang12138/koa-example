const request = require('../util/request')
const { jueQueryUrl, TipConfig } = require('../config')

const categoryConfig = {
    'recommend': {
        id: '',
        queryId: '21207e9ddb1de777adeaca7a2fb38030'
    },
    'backend': {
        id: '5562b419e4b00c57d9b94ae2',
        queryId: '653b587c5c7c8a00ddf67fc66f989d42'
    },
    'frontend': {
        id: '5562b415e4b00c57d9b94ac8',
        queryId: '653b587c5c7c8a00ddf67fc66f989d42'
    },
    'android': {
        id: '5562b410e4b00c57d9b94a92',
        queryId: '653b587c5c7c8a00ddf67fc66f989d42'
    },
    'ios': {
        id: '5562b405e4b00c57d9b94a41',
        queryId: '653b587c5c7c8a00ddf67fc66f989d42'
    },
    'ai': {
        id: '57be7c18128fe1005fa902de',
        queryId: '653b587c5c7c8a00ddf67fc66f989d42'
    },
    'tools': {
        id: '5562b422e4b00c57d9b94b53',
        queryId: '653b587c5c7c8a00ddf67fc66f989d42'
    },
    'codeLife': {
        id: '5c9c7cca1b117f3c60fee548',
        queryId: '653b587c5c7c8a00ddf67fc66f989d42'
    },
    'read': {
        id: '5562b428e4b00c57d9b94b9d',
        queryId: '653b587c5c7c8a00ddf67fc66f989d42'
    }
}

const tagQueryId = '801e22bdc908798e1c828ba6b71a9fd9'

function getJueQueryData ({type = 'recommend', order = 'POPULAR', tags = ''}) {
    let isGetTag = tags === 'list'
    let id = isGetTag ? tagQueryId : categoryConfig[type].queryId
    let category = categoryConfig[type].id
    const variables = {
        recommend: {
            after: "",
            first: 20,
            order
        },
        tags: {
            category,
            limit: 15 
        },
        pins: {
            size: 20,
            after: '',
            afterPosition: ''
        },
        default: {
            tags: tags ? tags.split(',') : [],
            category,
            after: "",
            first: 20,
            order
        }
    }
    return {
        extensions: {
            query: {
                id
            }
        },
        operationName: '',
        query: '',
        variables: variables[isGetTag ? 'tags' : type] || variables['default']
    }
}

module.exports = {
    jueQuery: ({ category, order, tags }) => {
        let data = getJueQueryData({
            order,
            tags,
            type: category
        })
        return new Promise((resolve, reject) => {
            request.post(jueQueryUrl, data, (res) => {
                resolve({
                    status: 200,
                    data: res.body.data
                })
            }, (err) => {
                resolve({
                    status: 404,
                    data: TipConfig['api10004']
                })
            })
        })
    }
}