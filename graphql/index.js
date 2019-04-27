const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql')

const Unit = new GraphQLEnumType({
    name: 'Unit',
    description: '单位',
    values: {
        MM: {value: 'MM'},
        cm: {value: 'cm'},
        mm: {value: 'mm'}
    }
})

const User = new GraphQLObjectType({
    name: 'User',
    description: '用户信息实体',
    fields: () => {
        return ({
            name: {type: new GraphQLNonNull(GraphQLString)},
            sex: {type: new GraphQLNonNull(GraphQLString)},
            intro: {type: new GraphQLNonNull(GraphQLString)},
            skills: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
            stature: {
                type: GraphQLFloat,
                args: {
                    unit: {type: Unit}
                },
                resolve: function(user, {unit}) {
                    if (unit === 'MM') {
                        return user.stature / 100
                    } else if (unit === 'cm') {
                        return user.stature
                    } else if (unit === 'mm') {
                        return user.stature * 10
                    }
                }
            }
        })
    }
})

const  UserInput=new GraphQLInputObjectType({
    name:'UserInput',
    description:"用户信息Input实体",
    fields:()=>({
        name:{type:new GraphQLNonNull(GraphQLString)},
        sex:{type:new GraphQLNonNull(GraphQLString)},
        intro:{type:new GraphQLNonNull(GraphQLString)},
        skills:{type:new GraphQLNonNull(new GraphQLList(GraphQLString))},
        stature:{type:Unit},
    }),
})

const Query = new GraphQLObjectType({
    name: 'UserQuery',
    description: '用户信息查询',
    fields: () => ({
        user: {
            type: User,
            description: '根据ID查询单个用户信息',
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: function(source, {id}) {
                return users[id]
            }
        },
        users: {
            type: new GraphQLList(User),
            description: '查询全部用户列表',
            resolve: function(){
                return users
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'UserMutation',
    description: '用户信息维护',
    fields: () => ({
        addUser: {
            type: User,
            description: '添加用户',
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                sex: {type: new GraphQLNonNull(GraphQLString)},
                intro: {type: new GraphQLNonNull(GraphQLString)},
                skills: {type: new GraphQLList(new GraphQLNonNull(GraphQLString))}
            },
            resolve: function(source, {name, sex, intro, skills}) {
                let user = {
                    name,
                    sex,
                    intro,
                    skills
                }
                users.push(user)
                return user
            }
        },
        addUserByInput: {
            type: User,
            description: '通过input添加用户',
            args: {
                userInfo: {type: UserInput}
            },
            resolve: function(source, {userInfo}) {
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
    })
})

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

