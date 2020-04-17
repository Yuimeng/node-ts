import {query} from "../db";

/**
 * 分页查询
 * @param page 页码
 * @param size 数量
 */
export const queryList = async (page: number, size: number) => {
  return await query(`select * from fangtian limit ?,?`, [(page - 1) * size, size])
}

/**
 * 查询所有
 */
export const queryAll = async () => {
  return await query(`select * from fangtian`)
}

/**
 * 查询表长度
 */
export const queryLen = async () => {
  return await query<any>(`select count(*) from fangtian`)
}
