import prisma from '@/lib/prisma'

export const GET = async (
  request: Request,
  {params}: {params: {usersId: string}}
) => {
  try {
    const usersId = params.usersId

    if (!usersId || typeof usersId !== 'string') {
      throw null
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: usersId,
      },
    })

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: usersId,
        },
      },
    })

    return new Response(JSON.stringify({...existingUser, followersCount}))
  } catch (error) {
    console.log(error)
    return new Response().status
  }
}
