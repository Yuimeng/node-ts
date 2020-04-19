import mysql from 'mysql'
import { dbConfig } from '../config'
const pool = mysql.createPool({
  connectionLimit: 10,
  ...dbConfig
})

/**
 *
 * @param sql 查询语句
 * @param params 查询参数
 */
export const query = <T>(sql: string, params?: any[]): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err)
      } else {
        conn.query(sql, params, (err, result) => {
          conn.release()
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      }
    })
  })
}
