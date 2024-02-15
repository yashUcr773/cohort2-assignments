import zod from 'zod'

export const POSTSCREATE = zod.object({
    title: zod.string().min(1).max(64),
    body: zod.string().min(1).max(255),
})

export const POSTSUPDATE = zod.object({
    title: zod.string().min(1).max(64).optional(),
    body: zod.string().min(1).max(255).optional(),
})