import {signJwtAccessToken, verifyJwtFreshToken} from '@/lib/jwt'
import prisma from '@/lib/prisma'

interface RequestBody {
  refresh_token: string
}

export const POST = async (request: Request) => {
  const body: RequestBody = await request.json()
  const isRefreshToken = verifyJwtFreshToken(body.refresh_token)
  if (isRefreshToken) {
    const user = await prisma.user.findFirst({
      where: {
        refresh_token: body.refresh_token,
      },
    })
    if (user) {
      const {hashedPassword, access_token, refresh_token, ...userWithoutPass} = user
      const access_tokens = signJwtAccessToken(userWithoutPass)
      const result = {
        ...userWithoutPass,
        access_token: access_tokens,
      }
      return new Response(JSON.stringify(result))
    }
  } else
    return new Response(
      JSON.stringify({
        error: true,
      }),
      {
        status: 404,
      }
    )
}
