import {POST as authOptions} from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import {getServerSession} from 'next-auth'

export const getSession = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return null
  return session
}

export const POST = async (
  request: Request,
  {params}: {params: {usersId: string}}
) => {
  try {
    const currentUser = await getSession()
    const usersId = params.usersId

    if (currentUser) {
      if (!usersId || typeof usersId !== 'string') {
        throw new Response(JSON.stringify('Invalid ID'))
      }

      const user = await prisma.user.findUnique({
        where: {
          id: usersId,
        }
      })
 
      if (!user) {
        throw new Response(JSON.stringify('Invalid ID'))
      }

      let updatedFollowingIds = [...(user.followingIds || [])]
      
      updatedFollowingIds.push(usersId)
  

      await prisma.notification.create({
        data: {
          body: `${user.name} follow you !`,
          user: {
            connect: {
              email: user?.email as string,
            },
          },
        },
      })
      await prisma.user.update({
        where: {
          id: usersId,
        },
        data: {
          hasNotification: true,
        },
      })
      const updateUser = await prisma.user.update({
        where: {
          email: currentUser.user.email as string,
        },
        data: {
          followingIds: updatedFollowingIds,
        },
      })

      return new Response(JSON.stringify(updateUser))
    }
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}

export const DELETE = async (
  request: Request,
  {params}: {params: {usersId: string}}
) => {
  try {
    const currentUser = await getSession()
    const usersId = params.usersId

    if (currentUser) {
      if (!usersId || typeof usersId !== 'string') {
        throw new Response(JSON.stringify('Invalid ID'))
      }

      const user = await prisma.user.findUnique({
        where: {
          id: usersId,
        },
      })

      if (!user) {
        throw new Response(JSON.stringify('Invalid ID'))
      }

      let updatedFollowingIds = [...(user?.followingIds || [])]

      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== usersId
      )

      const updatedUser = await prisma.user.update({
        where: {
          email: currentUser.user.email as string,
        },
        data: {
          followingIds: [...updatedFollowingIds],
        },
      })

      return new Response(JSON.stringify(updatedUser))
    }
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}
