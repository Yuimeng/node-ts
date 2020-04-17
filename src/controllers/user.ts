import {Middleware} from "koa";
import jwt from 'jsonwebtoken';
import {secret} from '../secret'
import {Response} from '../utils/response'
import {findOne, save} from "../models/users";
import bcrypt from 'bcryptjs'

/**
 * 登录
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
export const login: Middleware = async (ctx, next) => {
  await next();
  const {body} = ctx.request;
  const {username, password} = body;

  if (username && password) {
    const user = await findOne(username);

    // 查找用户
    if (!user) {
      throw new Error('用户不存在');
    }

    // 密码正确性
    const ok = bcrypt.compareSync(password, user.password);

    if (ok) {
      const token = jwt.sign({username, role: user.role}, secret, {
        expiresIn: '2 days'
      });
      ctx.body = new Response({token}, 20000, '登录成功');
    } else {
      throw new Error('密码错误');
    }
  } else {
    ctx.body = new Response({}, 40000, '必须输入用户信息');
  }
};

/**
 * 注册
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
export const register: Middleware = async (ctx, next) => {
  await next();
  const {body} = ctx.request;

  const {username, password} = body;
  if (username && password) {
    const user = await findOne(username);

    // 查找用户
    if (user) {
      throw new Error('用户已存在,不可注册');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await save({...body, password: hash, salt: salt});

    ctx.body = {
      code: 20000,
      message: '注册用户成功!'
    };
  } else {
    ctx.body = {
      code: 40000,
      message: '请输入必要的信息'
    };
  }
};
