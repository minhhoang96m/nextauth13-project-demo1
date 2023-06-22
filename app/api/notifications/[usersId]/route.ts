import prisma from '@/lib/prisma'

export const GET = async (
  request: Request,
  {params}: {params: {usersId: string}}
) => {
  try {
    const usersId = params.usersId
 
    if (!usersId || typeof usersId !== 'string') {
      throw new Error('Invalid ID')
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: usersId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    await prisma.user.update({
      where: {
        id: usersId,
      },
      data: {
        hasNotification: false,
      },
    })

    return new Response(JSON.stringify(notifications))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error))
  }
}
