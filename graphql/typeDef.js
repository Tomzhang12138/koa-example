const { gql } = require('apollo-server-koa')

const typeDefs = gql`
    type User {
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    input UserInput {
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    type Query {
        user(id:Int!): User
        users: [User]
    }
    type Mutation {
        addUser(name: String!, sex: String, intro: String, skills: [String]!): User
        addUserByInput(userInfo:UserInput!):User
    }
`
module.exports = typeDefs