'use client'

import {useRouter} from 'next/router'
import {ClipLoader} from 'react-spinners'

import usePost from '@/hooks/usePost'
import Header from '@/app/components/Header'
import PostItem from '@/app/components/posts/PostItem'
import Form from '@/app/components/Form'
import CommentFeed from '@/app/components/posts/CommentFeed'

const PostView = () => {
  const router = useRouter()
  const {postId} = router.query

  const {data: fetchedPost, isLoading} = usePost(postId as string)

  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label='Tweet' />
      <PostItem data={fetchedPost} />
      <Form
        usersId={postId as string}
        isComment
        placeholder='Tweet your reply'
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}

export default PostView
