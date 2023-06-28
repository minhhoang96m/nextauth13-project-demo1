import prisma from '@/lib/prisma'

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
    const header = await request.json()
    
    const body: string = header.data.body
    const userId : string = header.data.userId

    const post = await prisma.post.create({
      data: {
        body,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return new Response(JSON.stringify(post))
  } catch (error) {
    console.log(error)
    return new Response().status
  }
}

