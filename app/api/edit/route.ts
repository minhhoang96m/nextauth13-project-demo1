import {GET as authOptions} from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import {Session, getServerSession} from 'next-auth'

// export const getSession = async () => {
//   const session = await getServerSession(authOptions)
//   if (!session) return null
//   return session
// }

export const PATCH = async (request: Request) => {
  try {
    // const currentUser = await getSession()

    const currentUser = await getServerSession(authOptions) as Session
    const {name, username, bio, profileImage, coverImage} = await request.json()

    if (!name) {
      return new Response(JSON.stringify('Missing fields'))
    }

    const updatedUser = await prisma.user.update({
      where: {
        email:  currentUser?.user.email as string,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    })

    return new Response(JSON.stringify(updatedUser))
  } catch (error) {
    return new Response(JSON.stringify(error))
  }
}
