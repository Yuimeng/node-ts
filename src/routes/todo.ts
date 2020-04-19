import Router from 'koa-router'
import { deleteTodo, insertTodo, queryTodo, updateTodo } from '../controllers/todo'

export default (router: Router) => {
  router.get('/todo', queryTodo).post('/todo', insertTodo).put('/todo', updateTodo).delete('/todo/:id', deleteTodo)
}
