'use client'

import { ClipLoader } from 'react-spinners'

import Form from '@/app/components/Form'
import Header from '@/app/components/Header'
import CommentFeed from '@/app/components/posts/CommentFeed'
import PostItem from '@/app/components/posts/PostItem'
import usePosts from '@/hooks/usePosts'


const PostView = ({params}: {params: {postId: string}}) => {

  const postId = params.postId

  const {data: fetchedPost,mutate : mutateComment, isLoading} = usePosts(postId)
  mutateComment()


  if (isLoading || !fetchedPost) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label='Home' />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string} 
        isComment
        placeholder='Tweet your reply'
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  )
}

export default PostView

