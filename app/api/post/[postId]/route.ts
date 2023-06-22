import prisma from '@/lib/prisma'

export const GET = async (
  request: Request,
  {params}: {params: {postId: string}}
) => {
  try {
    const postId = params.postId

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
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
