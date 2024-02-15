import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate"
import { Context, Env } from "hono"
import { env } from "hono/adapter"

export default async function initializePrisma(c: Context) {

    const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

    return new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate())

}