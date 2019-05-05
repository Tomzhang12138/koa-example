const query = require('./db')

async function getSessionList() {
    let sql = `select * from _mysql_session_store`
    let list = await query(sql)
    return list
}

async function getUserById(id) {
    let sql = `select * from user where id=${id}`
    let result = await query(sql)
    if (result.length > 0) {
        return result[0]
    }
    return []
}

async function getUserByName(name) {
    let sql = `select count(*) as total from user where name='${name}'`
    let result = await query(sql)
    if (result[0].total > 0) {
        return true
    }
    return false
}

async function removeUserById(id) {
    let sql = `delete from user where id=${id}`
    let result = await query(sql)
    return result
}

async function getUserList() {
    let sql = `select * from user`
    let list = await query(sql)
    return list
}

async function addUser(userInfo) {
    let sql = `insert into user values(NULL, '${userInfo.name}', '${userInfo.intro}', ` +
        `'${userInfo.sex}', '${userInfo.skills.join(',')}')`
    let result = await query(sql)
    return result
}

module.exports = {
    getSessionList,
    getUserList,
    getUserById,
    addUser,
    removeUserById,
    getUserByName
}
