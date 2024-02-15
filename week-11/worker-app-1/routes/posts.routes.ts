import { Context, Hono, Next } from 'hono'
import initializePrisma from '../utils/initialize-prisma.utils'
import { Jwt } from 'hono/utils/jwt'
import { env } from 'hono/adapter'
import { POSTSCREATE, POSTSUPDATE } from '../validations/posts.validation'

type Variables = {
    userId: number
    newToken: string
}

const app = new Hono<{ Variables: Variables }>()

const checkAuth = async (c: Context, next: Next) => {

    // get header
    const autherization = c.req.header('Authorization')
    const token = autherization?.split(' ')[1]

    try {

        // check if token exists
        if (!token) {
            throw new Error('JWT not Found')
        }

        // verify token
        const { JWTSECRET } = env<{ JWTSECRET: string }>(c)
        const { JWTEXPIRYTIME } = env<{ JWTEXPIRYTIME: number }>(c)
        let res = await Jwt.verify(token, JWTSECRET)

        // generate new token
        const newToken = await Jwt.sign({ userId: res.userId, expiryAt: Date.now() + JWTEXPIRYTIME }, JWTSECRET)

        // set vars
        c.set('userId', res.userId)
        c.set('newToken', newToken)
        return await next();
    } catch (e) {
        return c.json({
            message: 'Invalid authorization',
            success: false
        })

    }

}

app.get('/allposts', async (c) => {

    try {
        const prisma = await initializePrisma(c)
        const posts = await prisma.posts.findMany({
            include: {
                user: {
                    select: {
                        firstname: true,
                        lastname: true,
                        username: true,
                        email: true,
                        id: true
                    }
                }
            }
        })
        const userId = c.get('userId')
        const newToken = c.get('newToken')

        return c.json({
            success: true,
            message: 'Posts Found',
            posts
        })
    } catch (error) {
        console.log(error)
        return c.json({ success: false, message: 'Some Error Occured', error })
    }
})

app.get('/', checkAuth, async (c) => {

    try {
        const prisma = await initializePrisma(c)
        const userId = c.get('userId')

        const posts = await prisma.posts.findMany({
            where: {
                userId: userId
            }
        })

        return c.json({
            success: true,
            message: 'Posts Found',
            posts
        })
    } catch (error) {
        console.log(error)
        return c.json({ success: false, message: 'Some Error Occured', error })
    }
})

app.post('/', checkAuth, async (c) => {

    try {
        const prisma = await initializePrisma(c)
        const { title, body } = await c.req.json()
        const userId = c.get('userId')

        // data validation
        const { success, error }: any = POSTSCREATE.safeParse({ title, body })
        if (!success) {
            return c.json({
                message: 'Incorrect data entered',
                success: false,
                issues: error.issues
            })
        }

        // create post
        const post = await prisma.posts.create({
            data: {
                title, body,
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
        })

        return c.json({
            success: true,
            message: 'Post created',
            post
        })
    } catch (error) {
        console.log(error)
        return c.json({ success: false, message: 'Some Error Occured', error })
    }
})

app.get('/:postId', async (c) => {

    try {
        const prisma = await initializePrisma(c)
        const postId = +c.req.param('postId')

        const post = await prisma.posts.findUnique({
            where: {
                id: postId
            },
            include: {
                user: {
                    select: {
                        firstname: true,
                        lastname: true,
                        username: true,
                        email: true,
                        id: true
                    }
                }
            }
        })

        if (!post) {
            return c.json({
                success: false,
                message: 'Post not Found',
            })
        }

        return c.json({
            success: true,
            message: 'Posts Found',
            post
        })
    } catch (error) {
        console.log(error)
        return c.json({ success: false, message: 'Some Error Occured', error })
    }
})

app.put('/:postId', checkAuth, async (c) => {

    try {
        const prisma = await initializePrisma(c)
        const postId = +c.req.param('postId')
        const userId = c.get('userId')
        const { title, body } = await c.req.json()

        // data validation
        if (!title && !body) {
            return c.json({
                message: 'Title or body required',
                success: false,
            })
        }

        const { success, error }: any = POSTSUPDATE.safeParse({ title, body })
        if (!success) {
            return c.json({
                message: 'Incorrect data entered',
                success: false,
                issues: error.issues
            })
        }

        // check if current user owns the posts
        const post = await prisma.posts.findUnique({
            where: {
                id: postId
            }
        })

        if (!post) {
            return c.json({
                success: false,
                message: 'Post not Found',
            })
        }

        if (post?.userId != userId) {
            return c.json({
                success: false,
                message: "you cant update posts you dont own"
            })
        }

        let updateBody = {}
        if (title) updateBody = { ...updateBody, title }
        if (body) updateBody = { ...updateBody, body }

        const updatedPost = await prisma.posts.update({
            where: {
                id: postId
            },
            data: updateBody
        })

        return c.json({
            success: true,
            message: 'Post updated',
            updatedPost
        })
    } catch (error) {
        console.log(error)
        return c.json({ success: false, message: 'Some Error Occured', error })
    }
})

app.delete('/:postId', checkAuth, async (c) => {

    try {
        const prisma = await initializePrisma(c)
        const postId = +c.req.param('postId')
        const userId = c.get('userId')

        // check if current user owns the posts
        const deletedPostsCount = await prisma.posts.deleteMany({
            where: {
                id: postId,
                userId: userId
            }
        })

        if (deletedPostsCount.count == 0) {
            return c.json({
                success: false,
                message: 'Post not found',
            })
        } else {
            return c.json({
                success: true,
                message: 'Post deleted',
            })
        }
    } catch (error) {
        console.log(error)
        return c.json({ success: false, message: 'Some Error Occured', error })
    }
})

export default app