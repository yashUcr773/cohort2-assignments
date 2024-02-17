import { Hono } from 'hono'
import userRouter from './user.routes'
import postRouter from './posts.routes'

const baseRouter = new Hono()
baseRouter.route('/users', userRouter)
baseRouter.route('/posts', postRouter)

export default baseRouter