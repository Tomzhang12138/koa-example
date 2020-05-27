const mysql = require('mysql')
const { MysqlConfig } = require('../config')

const pool = mysql.createPool({
    host: MysqlConfig.host,
    port: MysqlConfig.port,
    user: MysqlConfig.user,
    password: MysqlConfig.password,
    database: MysqlConfig.database
})

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports = query
