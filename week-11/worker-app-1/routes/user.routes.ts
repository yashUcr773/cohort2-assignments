import { Hono } from 'hono'
import initializePrisma from '../utils/initialize-prisma.utils'
import { USERSIGNIN, USERSIGNUP } from '../validations/user.validations'
import { Jwt } from 'hono/utils/jwt'
import { passwordHasher } from '../utils/password-hasher.utils'
import { env } from 'hono/adapter'
const app = new Hono()


app.post('/signup', async (c) => {
    try {

        const prisma = await initializePrisma(c)
        const { username, password, email, firstname, lastname } = await c.req.json()

        // input validation
        const { success, error }: any = USERSIGNUP.safeParse({ username, password, email, firstname, lastname })

        if (!success) {
            return c.json({
                message: 'Incorrect data entered',
                success: false,
                issues: error.issues
            })
        }

        // check if exists 
        const exists = await prisma.user.findUnique({
            where: { username }
        })

        if (exists) {
            return c.json({
                message: 'Username Taken',
                success: false,
            })
        }

        // create user
        const user = await prisma.user.create({
            data: {
                username,
                password: passwordHasher(password),
                firstname,
                lastname,
                email
            }
        })

        // create JWT
        const { JWTSECRET } = env<{ JWTSECRET: string }>(c)
        const { JWTEXPIRYTIME } = env<{ JWTEXPIRYTIME: number }>(c)
        const token = await Jwt.sign({ userId: user.id, expiryAt: Date.now() + JWTEXPIRYTIME }, JWTSECRET)
        return c.json({
            message: 'Signup Successful',
            success: true,
            token
        })
    } catch (e) {
        return c.json({
            message: 'Some Error Occured',
            success: false,
            error: e
        })
    }
})

app.post('/signin', async (c) => {
    try {

        const prisma = await initializePrisma(c)
        const { username, password } = await c.req.json()

        // input validation
        const { success, error }: any = USERSIGNIN.safeParse({ username, password })

        if (!success) {
            return c.json({
                message: 'Incorrect data entered',
                success: false,
                issues: error.issues
            })
        }

        // check if exists 
        const user = await prisma.user.findUnique({
            where: { username, password }
        })

        if (!user) {
            return c.json({
                message: 'Username or password incorrect',
                success: false,
            })
        }

        // create JWT
        const { JWTSECRET } = env<{ JWTSECRET: string }>(c)
        const { JWTEXPIRYTIME } = env<{ JWTEXPIRYTIME: number }>(c)
        const token = await Jwt.sign({ userId: user.id, expiryAt: Date.now() + JWTEXPIRYTIME }, JWTSECRET)
        return c.json({
            message: 'Signin Successful',
            success: true,
            token
        })
    } catch (e) {
        return c.json({
            message: 'Some Error Occured',
            success: false,
            error: e
        })
    }
})

export default app