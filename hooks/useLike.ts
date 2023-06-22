import axios from 'axios'
import {useCallback, useMemo} from 'react'
import {toast} from 'react-hot-toast'

import {useSession} from 'next-auth/react'
import useLoginModal from './useLoginModal'
import usePost from './usePost'
import usePosts from './usePosts'

const useLike = ({
  postId,
  usersId,
}: {
  postId: string
  usersId?: string | undefined
}) => {
  const {data: currentUser} = useSession()
  const userId = currentUser?.user.id
  const {mutate: mutateFetchedPosts} = usePost(usersId)
  const {data: fetchedPost, mutate: mutateFetchedPost} = usePosts(postId)

  const loginModal = useLoginModal()

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || []

    return list.includes(currentUser?.user.id)
  }, [fetchedPost, currentUser])

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      let request

      if (hasLiked) {
        request = () =>
          axios.patch(`/api/like`, {
            data: {postId, userId},
          })
      } else {
        request = () =>
          axios.post(`/api/like`, {
            data: {postId, userId},
          })
      }

      await request()
      await mutateFetchedPosts()
      await mutateFetchedPost()

      toast.success('Success')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    userId,
    mutateFetchedPosts,
    mutateFetchedPost,
    loginModal,
  ])

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike
