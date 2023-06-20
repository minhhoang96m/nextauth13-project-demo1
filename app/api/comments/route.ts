import {NextApiRequest, NextApiResponse} from 'next'

import serverAuth from '@/lib/serverAuth'
import prisma from '@/lib/prisma'

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const currentUser = await serverAuth()
    const {body} = req.body
    const {postId} = req.query

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID')
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser?.id as string,
        postId,
      },
    })

    // NOTIFICATION PART START
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      })

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: 'Someone replied on your tweet!',
            userId: post.userId,
          },
        })

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
    // NOTIFICATION PART END

    return res.status(200).json(comment)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
