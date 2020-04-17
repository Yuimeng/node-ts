import router from "./index";
import Router from "koa-router";
import {login, register} from '../controllers/user'

export default (router: Router) => {
  router.post('/login', login)
  router.post('/register', register)
}
