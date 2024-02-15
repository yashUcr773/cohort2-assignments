import { Hono } from 'hono'
import baseRouter from '../routes/index.routes'

const app = new Hono()

app.route('/api/v1', baseRouter)

app.get('/', (c) => {
    return c.text('Hello World!')
})

export default app
