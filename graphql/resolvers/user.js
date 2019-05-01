const { addUser, getUserList, getUserById, removeUserById } = require('../../model/index')


const resolvers = {
    Query: {
        user: async function(args, {id}) {
            return await getUserById(id)
        },
        users: async function() {
            let users = await getUserList()
            return users
        }
    },
    Mutation: {
        addUser: async function(args, {name, sex, intro, skills}) {
            let user = {
                name,
                sex,
                intro,
                skills
            }
            let result = await addUser(user)
            if (result.affectedRows > 0) {
                return user
            }
            console.log(result.message)
            return {}
        },
        addUserByInput: async function(args, {userInfo}) {
            let user = {
                name: userInfo.name,
                sex: userInfo.sex,
                intro: userInfo.intro,
                skills: userInfo.skills
            }
            let result = await addUser(user)
            if (result.affectedRows > 0) {
                return user
            }
            console.log(result.message)
            return {}
        },
        removeUser: async function(args, {id}) {
            let result = await removeUserById(id)
            let result = await addUser(user)
            if (result.affectedRows > 0) {
                return user
            }
            console.log(result.message)
            return {}
        }
    }
}

module.exports = resolvers