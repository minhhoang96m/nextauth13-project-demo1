import { POST as authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST' && req.method !== 'DELETE') {
//     return res.status(405).end();
//   }

//   try {
//     const { userId } = req.body;

//     const  currentUser  = await serverAuth()

//     if (!userId || typeof userId !== 'string') {
//       throw new Error('Invalid ID');
//     }

//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId
//       }
//     });

//     if (!user) {
//       throw new Error('Invalid ID');
//     }

//     let updatedFollowingIds = [...(user.followingIds || [])];

//     if (req.method === 'POST') {
//       updatedFollowingIds.push(userId);

//       // NOTIFICATION PART START
//       try {
//         await prisma.notification.create({
//           data: {
//             body: 'Someone followed you!',
//             userId,
//           },
//         });

//         await prisma.user.update({
//           where: {
//             id: userId,
//           },
//           data: {
//             hasNotification: true,
//           }
//         });
//       } catch (error) {
//         console.log(error);
//       }
//       // NOTIFICATION PART END

//     }

//     if (req.method === 'DELETE') {
//       updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
//     }

//     const updatedUser = await prisma.user.update({
//       where: {
//         id: currentUser?.id
//       },
//       data: {
//         followingIds: updatedFollowingIds
//       }
//     });

//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).end();
//   }
// }

export const getSession = async () => {
  const session = await getServerSession(authOptions)
  if (!session) return null
  return session
}

export const POST = async (request: Request) => {
  try {
    const currentUser = await getSession()
    const {data : usersId } = await request.json()

    console.log(currentUser)
    console.log(usersId)
 
    const users = await prisma.user.findUnique({
      where: {
        id : usersId
      },
    })
    console.log(!users)
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

      let updatedFollowingIds = [...(user.followingIds || [])]

      updatedFollowingIds.push(currentUser.user.id)

      console.log([...updatedFollowingIds])

      await prisma.notification.create({
        data: {
          body: 'Someone followed you!',
          user: {
            connect: {
              email: user.email as string,
            },
          },
        },
      })

      const updateUser = await prisma.user.update({
        where: {
          id: usersId,
        },
        data: {
          hasNotification: true,
          followingIds: [...updatedFollowingIds],
        },
      })
      console.log(updateUser)
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

      let updatedFollowingIds = [...(user.followingIds || [])]

      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== usersId
      )

      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser?.user.id,
        },
        data: {
          followingIds: updatedFollowingIds,
        },
      })

      return new Response(JSON.stringify(updatedUser))
    }
  } catch (error) {
    return new Response().status
  }
}
