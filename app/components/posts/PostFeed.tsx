'use client'

import usePost from '@/hooks/usePost'

import PostItem from './PostItem'

interface PostFeedProps {
  usersId?: string
}

const PostFeed: React.FC<PostFeedProps> = ({usersId}) => {
  const {data: posts = [], mutate: mutatePost} = usePost(usersId as string)
  mutatePost()
  return (
    <>
      {posts ? (
        posts.map((post: Record<string, any>) => (
          <PostItem usersId={usersId} key={post.id} data={post} />
        ))
      ) : (
        <> </>
      )}
    </>
  )
}

export default PostFeed
