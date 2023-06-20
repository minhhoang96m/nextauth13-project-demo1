import {getServerSession} from 'next-auth/next'

import {GET as authOptions} from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function getSession() {
  return await getServerSession(authOptions)
}

const serverAuth = async () => {
  try {
    const session = await getSession()

    if (!session) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error: any) {
    return null
  }
}

export default serverAuth
