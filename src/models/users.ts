import { query } from '../db'
import { Common } from '../utils/response'

export interface User extends Common {
  username: string;
  password: string;
  salt: string;
  role: string;
}

// insert
// OkPacket {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 10,
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0 }

// delete
// OkPacket {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 0,
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0 }

// update
// OkPacket {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 0,
//   serverStatus: 2,
//   warningCount: 0,
//   message: '(Rows matched: 1  Changed: 1  Warnings: 0',
//   protocol41: true,
//   changedRows: 1 }

/**
 * 保存用户
 * @return {Promise<void>}
 */
export const save = async <T>(user: User): Promise<T[]> => {
  const params = [user.username, user.password, user.salt, user.role]
  const sql = `insert into user (username, password, salt, role) values(?,?,?,?)`
  return await query(sql, params)
}

/**
 * 删除用户
 * @return {Promise<void>}
 */
export const del = async(username: string) => {
  const params = [username]
  const sql = `delete from user where username=?`
  return await query(sql, params)
}

export const update = async(user: User) => {
  const params = [user.password, user.role, user.username]
  const sql = `update user set password=?,role=? where username=?`
  return await query(sql, params)
}

/**
 * 查找用户
 * @param username {string}
 * @return {Promise<void>}
 */
export const findOne = async <T = User>(username: string): Promise<T> => {
  const sql = `select * from user where username=? limit 1`
  const users = await query<T>(sql, [username])
  return users[0]
}

export const findAll = async <T = User>(): Promise<T[]> => {
  const sql = `select id, username, role from user`
  return await query<T>(sql)
}

// save({username: 'juejin', password: '12345677', role: 'user', salt: 'hello world'}).then(res => {
//   console.log(res)
// }).catch(e => {
//   console.log('e:', e)
// })
// del('juejin').then(res => {
//   console.log(res)
// }).catch(e => {
//   console.log('e:', e)
// })

// update({username: 'juejin', password: '12345677', role: 'user', salt: 'hello world'}).then(res => {
//   console.log(res)
// }).catch(e => {
//   console.log('e:', e)
// })

// findOne('juejin').then(res=>{
//   console.log(res)
// }).catch(e => {
//   console.log('e:', e)
// })

// findAll().then(res=>{
//   console.log(res)
// }).catch(e => {
//   console.log('e:', e)
// })

