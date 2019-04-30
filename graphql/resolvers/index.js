const path = require('path')
const fs = require('fs')

let resolvers = {}

const resolvesPath = path.resolve(__dirname)

fs.readdirSync(resolvesPath).map(filename => {
    if (filename === 'index.js') {
        return
    }
    resolvers = Object.assign({}, resolvers, require(path.join(resolvesPath, filename)))
})

module.exports = resolvers