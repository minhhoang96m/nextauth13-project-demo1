import {GET as authOptions} from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import {Session, getServerSession} from 'next-auth'

export const GET = async (request: Request) => {
  try {
    const currentUser = (await getServerSession(authOptions)) as Session

    if (currentUser) {
      const user = await prisma.user.findUnique({
        where: {
          email: currentUser?.user?.email as string,
        },
      })
      return new Response(JSON.stringify(user))
    }
    return new Response(JSON.stringify(null))
  } catch (error) {
    console.log(error)
    return new Response().status
  }
}
