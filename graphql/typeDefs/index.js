const path = require('path')
const fs = require('fs')

let typeDefs = ``
const gqlPath = path.resolve(__dirname)

fs.readdirSync(gqlPath).forEach(filename => {
    if (filename.match(/\.(gql)$/)) {
        typeDefs += fs.readFileSync(path.join(gqlPath, filename), 'utf8')
    }
})

module.exports = typeDefs