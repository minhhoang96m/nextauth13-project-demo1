import prisma from '@/lib/prisma'

export const GET = async (request: Request) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    if (users) return new Response(JSON.stringify(users))
    return new Response().status
  } catch (error) {
    console.log(error)
    return new Response().status
  }
}
