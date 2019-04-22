const { query } = require('./db')

async function getSessionList() {
    let sql = `select * from _mysql_session_store`
    let dataList = await query(sql)
    return dataList
}

module.exports = {
    getSessionList
}