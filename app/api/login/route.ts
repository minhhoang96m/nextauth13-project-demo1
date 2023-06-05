import {signJwtAccessToken, signJwtRefreshToken} from '@/lib/jwt'
import prisma from '@/lib/prisma'
import * as bcrypt from 'bcrypt'

interface RequestBody {
    username: string
    password: string
}

export const POST = async (request: Request) => {
    try {
        const body: RequestBody = await request.json()

        const user = await prisma.user.findFirst({
            where: {
                email: body.username,
            },
        })
        if (
            user &&
            (await bcrypt.compare(body.password, user.password as string))
        ) {
            const {password, access_token, refresh_token, ...userWithoutPass} =
                user
            const access_tokens = signJwtAccessToken(userWithoutPass)
            const refresh_tokens = signJwtRefreshToken(userWithoutPass)
            if (refresh_token === null) {
                await prisma.user.update({
                    where: {email: body.username},
                    data: {refresh_token: refresh_tokens},
                })
                const result = {
                    ...userWithoutPass,
                    access_token: access_tokens,
                    refresh_token: refresh_tokens,
                }
                return new Response(JSON.stringify(result))
            } else {
                await prisma.user.update({
                    where: {email: body.username},
                    data: {refresh_token: null},
                })
                await prisma.user.update({
                    where: {email: body.username},
                    data: {refresh_token: refresh_tokens},
                })
                const result = {
                    ...userWithoutPass,
                    access_token: access_tokens,
                    refresh_token: refresh_tokens,
                }
                return new Response(JSON.stringify(result))
            }
        } else return new Response(JSON.stringify(null))
    } catch (error) {
        console.log('This is Error', error)
    }
}
