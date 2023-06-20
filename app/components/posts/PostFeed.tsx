'use client'

import usePosts from '@/hooks/usePosts'

import PostItem from './PostItem'

interface PostFeedProps {
  usersId?: string
}

const PostFeed: React.FC<PostFeedProps> = ({usersId}) => {
  const {data: posts = []} = usePosts(usersId)

  return (
    <>
      {posts ? (
        posts.map((post: Record<string, any>) => (
          <PostItem usersId={usersId} key={post.id} data={post} />
        ))
      ) : (
        <></>
      )}
    </>
  )
}

export default PostFeed
