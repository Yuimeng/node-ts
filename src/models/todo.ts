import {query} from "../db";
import {Common} from "../utils/response";

export interface Todo extends Common {
  username: string
  todo: string
  is_done: number
}

/**
 * 查询所有待办
 * @param username 用户名
 */
export const queryAll = async (username: string) => {
  return await query(`select id, username, todo, is_done from k_todo where username=?`, [username])
}


/**
 * 分页查询待办
 * @param page 页码
 * @param size 分页大小
 * @param username 用户名
 */
export const queryByPage = async <T = any>(page: number, size: number, username: string): Promise<T[]> => {
  return await query(`select id, username, todo, is_done from k_todo where username=? limit ?,?`, [username, size * (page - 1), size])
}

/**
 * 新增待办
 * @param todo
 */
export const insert = async (todo: Todo) => {
  return await query(`INSERT INTO k_todo (username, todo, is_done) VALUES (?, ?, ?)`, [todo.username, todo.todo, todo.is_done])
}

/**
 * 更新待办
 * @param todo
 */
export const update = async (todo: Todo) => {
  return await query(`UPDATE k_todo SET todo=?, is_done=? WHERE id=?`, [todo.todo, todo.is_done, todo.id])
}

/**
 * 删除待办
 * @param id
 * @param username
 */
export const del = async (id: string, username: string) => {
  return await query(`DELETE FROM k_todo WHERE id=? AND username=?`, [id, username])
}

/**
 * 查询表长度
 */
export const queryLen = async () => {
  return await query<any>(`select count(*) from k_todo`)
}
