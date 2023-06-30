import {POST as authOptions} from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import {Session, getServerSession} from 'next-auth'

export const POST = async (request: Request) => {
  try {
    const currentUser = (await getServerSession(authOptions)) as Session
    const usersId = await request.json()
    const postId: string = usersId.data.postId
    const userId: string = usersId.data.userId

    if (!currentUser) {
      throw new Response(JSON.stringify('Invalid ID'))
    }

    const user = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!user) {
      throw new Response(JSON.stringify('Invalid ID'))
    }

    let updatedLikedIds = [...(user.likedIds || [])]

    updatedLikedIds.push(userId)

    await prisma.notification.create({
      data: {
        body: `${currentUser?.user.name} like you !`,
        user: {
          connect: {
            id: user?.userId,
          },
        },
      },
    })
    await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        hasNotification: true,
      },
    })
    const updateUser = await prisma.post.update({
      where: {
        id: user.id,
      },
      data: {
        likedIds: [...updatedLikedIds],
      },
    })

    return new Response(JSON.stringify(updateUser))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}

export const PATCH = async (request: Request) => {
  try {
    // const currentUser = await getSession()

    const currentUser = (await getServerSession(authOptions)) as Session

    const usersId = await request.json()
    const postId: string = usersId.data.postId
    const userId: string = usersId.data.userId

    if (!currentUser) {
      throw new Response(JSON.stringify('Invalid ID'))
    }

    const user = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!user) {
      throw new Response(JSON.stringify('Invalid ID'))
    }

    let updatedLikedIds = [...(user?.likedIds || [])]

    updatedLikedIds = updatedLikedIds.filter((likedIds) => likedIds !== userId)

    await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        hasNotification: false,
      },
    })
    const updatedUser = await prisma.post.update({
      where: {
        id: user?.id,
      },
      data: {
        likedIds: [...updatedLikedIds],
      },
    })

    return new Response(JSON.stringify(updatedUser))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}
