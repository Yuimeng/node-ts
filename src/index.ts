import Koa from 'koa'
import router from './routes'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import BodyParser from 'koa-bodyparser'
import KoaStatic from 'koa-static'
import path from 'path'
import jwt from 'koa-jwt'
import { secret } from './secret'

const app = new Koa()

// 日志
app.use(logger())
app.use(helmet())
app.use(BodyParser())

app.use(KoaStatic(path.resolve('public')))

// 错误处理
app.use(async(ctx, next) => {
  await next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 40100,
        message: err.originalError ? err.originalError.message : err.message
      }
    } else {
      ctx.body = {
        code: 50000,
        message: err.message || 'error',
        error: err
      }
    }
  })
})

// token验证
// 登录的注册接口不验证
app.use(jwt({ secret }).unless({
  path: [/\/api\/login/, /\/api\/register/]
}))

// 添加路由
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
