import prisma from '@/lib/prisma'

export const GET = async (
  request: Request,
  {params}: {params: {usersId: string}}
) => {
  try {
    const usersId = params.usersId

    const post = await prisma.post.findMany({
      where: {
        userId: usersId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error))
  }
}
