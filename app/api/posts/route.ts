import {GET as authOptions} from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import {getServerSession} from 'next-auth'

export const getSession = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return null
  return session
}

export const GET = async (request: Request) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return new Response(JSON.stringify(posts))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error))
  }
}

export const POST = async (request: Request) => {
  try {
    const currentUser = await getSession()
    const {body}: any = await request.json()
    if (currentUser) {
      const post = await prisma.post.create({
        data: {
          body,
          user: {
            connect: {
              email: currentUser.user.email as string,
            },
          },
        },
      })
      return new Response(JSON.stringify(post))
    }
    return new Response().status
  } catch (error) {
    console.log(error)
    return new Response().status
  }
}
