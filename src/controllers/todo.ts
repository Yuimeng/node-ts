import { Middleware } from 'koa'
import { handleNum } from '../utils'
import { del, insert, queryAll, queryByPage, queryLen, Todo, update } from '../models/todo'

/**
 * 查询待办
 * @param ctx
 */
export const queryTodo: Middleware = async(ctx) => {
  const { username } = ctx.state.user
  let { page, size } = ctx.request.query

  if (page && size) {
    page = handleNum(page, 1)
    size = handleNum(size, 5)

    const res = await queryByPage<Todo>(page, size, username)
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
    ctx.body = {
      code: 20000,
      message: 'success',
      data: await queryAll(username)
    }
  }
}

/**
 * 新增待办
 * @param ctx
 */
export const insertTodo: Middleware = async(ctx) => {
  const { body } = ctx.request
  const { username } = ctx.state.user
  console.log(body)
  await insert({ ...body, username })
  ctx.body = {
    code: 20000,
    message: 'success'
  }
}

/**
 * 更新待办
 * @param ctx
 */
export const updateTodo: Middleware = async(ctx) => {
  const { body } = ctx.request
  const { username } = ctx.state.user
  await update({ ...body, username })
  ctx.body = {
    code: 20000,
    message: 'success'
  }
}

/**
 * 删除待办
 * @param ctx
 */
export const deleteTodo: Middleware = async(ctx) => {
  const { id } = ctx.params
  const { username } = ctx.state.user
  await del(id, username)
  ctx.body = {
    code: 20000,
    message: 'success'
  }
}
