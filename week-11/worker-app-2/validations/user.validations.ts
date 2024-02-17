import zod from 'zod'

export const USERSIGNUP = zod.object({
    username: zod.string().min(4).max(32),
    password: zod.string().min(4).max(32),
    firstname: zod.string().min(4).max(32),
    lastname: zod.string().min(4).max(32),
    email: zod.string().email()
})

export const USERSIGNIN = zod.object({
    username: zod.string().min(4).max(32),
    password: zod.string().min(4).max(32),
})