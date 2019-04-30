const query = require('./db')

async function getSessionList() {
    let sql = `select * from _mysql_session_store`
    let list = await query(sql)
    return list
}

module.exports = getSessionList