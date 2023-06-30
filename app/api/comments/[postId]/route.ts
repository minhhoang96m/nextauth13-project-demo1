import {POST as authOptions} from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import {Session, getServerSession} from 'next-auth'


export const POST = async (
  request: Request,
  {params}: {params: {postId: string}}
) => {
  try {
    const currentUser = await getServerSession(authOptions) as Session
    const header = await request.json()

    const postId = params.postId

    const userId : string = header.data.userId
    const body : string = header.data.body

    if (!currentUser) {
      return new Response(JSON.stringify('Invalid ID'))
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: userId,
        postId,
      },
    })

    // NOTIFICATION PART START
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      })
      
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: `${currentUser.user.name} replied on your tweet!`,
            userId: post.userId,
          },
        })

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        })
      }
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 500 })
    }
    // NOTIFICATION PART END

    return new Response(JSON.stringify(comment))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}
