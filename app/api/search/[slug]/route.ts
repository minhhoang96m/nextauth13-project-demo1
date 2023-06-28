
import prisma from '@/lib/prisma'

export const POST = async (request: Request,{ params }: { params: { slug: string }}) => {
try {
    const param = params.slug
    if (typeof param !== 'string') {
      throw new Error('Invalid request')
    }
    const user = await prisma.user.findMany({
      where: {
          OR: [
            {
              name : {
                contains: param as string,
                mode: 'insensitive',
                
              }
            }
          ]
      },
      include: {
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
    // const user = await prisma.user.findMany()
   
    return new Response(JSON.stringify(user))
}
 catch (error) {
  console.log(error)
  return new Response().status
}}