const users = [
    {
        name: 'zyw',
        sex: '男',
        intro: '博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3',
        skills: ['Linux','Java','nodeJs','前端'],
    },
    {
        name: 'James',
        sex: '男',
        intro: 'zyw',
        skills: ['Linux','Java','nodeJs','前端'],
    }
]


const resolvers = {
    Query: {
        user: function(args, {id}) {
            return users[id || 0]
        },
        users: function() {
            return users
        }
    },
    Mutation: {
        addUser: function(args, {name, sex, intro, skills}) {
            let user = {
                name,
                sex,
                intro,
                skills
            }
            users.push(user)
            return user
        },
        addUserByInput: function(args, {userInfo}) {
            let user = {
                name: userInfo.name,
                sex: userInfo.sex,
                intro: userInfo.intro,
                skills: userInfo.skills
            }
            users.push(user)
            return user
        }
    }
}

module.exports = resolvers