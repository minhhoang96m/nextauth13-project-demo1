import prisma from '@/lib/prisma'

// export default async function GET(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'GET') {
//     return res.status(405).end()
//   }

//   try {
//     const users = await prisma.user.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })

//     return res.status(200).json(users)
//   } catch (error) {
//     console.log(error)
//     return res.status(400).end()
//   }
// }

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
