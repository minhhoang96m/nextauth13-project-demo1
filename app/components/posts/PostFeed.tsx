'use client'

import usePost from '@/hooks/usePost'

import PostItem from './PostItem'


interface PostFeedProps {
  usersId?: string
}

const PostFeed: React.FC<PostFeedProps> = ({usersId}) => {
  const {data: posts = []} = usePost(usersId as string)

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
