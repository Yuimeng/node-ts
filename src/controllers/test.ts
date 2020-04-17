import {Context} from "koa";
import {handleNum} from '../utils'
import {queryAll, queryLen, queryList} from '../models'

/**
 * 分页查询
 * @param ctx
 */
export const findByPage = async (ctx: Context) => {
  const sql = `select * from fangtian limit ?, ?`
  let {page, size} = ctx.request.query

  if (page && size) {
    page = handleNum(page, 1)
    size = handleNum(size, 5)

    const res = await queryList(page, size)
    const len = await queryLen()

    ctx.body = {
      code: 20000,
      message: 'success',
      data: {
        page,
        size,
        total: len[0]['count(*)'],
        list: res
      }
    }
  } else {
    const res = await queryAll()
    ctx.body = {
      code: 20000,
      message: 'success',
      data: res
    }
  }
}
