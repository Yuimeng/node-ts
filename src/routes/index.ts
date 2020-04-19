import Router from 'koa-router'
import { findByPage } from '../controllers/test'
import todoRouter from './todo'
import userRouter from './user'

const router = new Router({ prefix: '/api' })

todoRouter(router)
userRouter(router)

router.get('list', '/list', findByPage)

router.post('/register', async ctx => {
  ctx.body = {
    message: 'register'
  }
})

export default router
