'use client'

import {useRouter} from 'next/navigation'
import {useCallback, useMemo} from 'react'
import {AiFillHeart, AiOutlineHeart, AiOutlineMessage} from 'react-icons/ai'
import {formatDistanceToNowStrict} from 'date-fns'

import useLoginModal from '@/hooks/useLoginModal'
import useCurrentUser from '@/hooks/useCurrentUser'
import useLike from '@/hooks/useLike'

import Avatar from '../Avatar'
interface PostItemProps {
  data: Record<string, any>
  usersId?: string
}

const PostItem: React.FC<PostItemProps> = ({data = {}, usersId}) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const {data: currentUser} = useCurrentUser()
  const {hasLiked, toggleLike} = useLike({postId: data.id, usersId})

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation()
      router.push(`twitter/users/${data.user.id}`)
    },
    [router, data.user.id]
  )

  const goToPost = useCallback(() => {
    router.push(`twitter/posts/${data.user.id}`)
  }, [router, data.user.id])

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      toggleLike()
    },
    [loginModal, currentUser, toggleLike]
  )

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null
    }

    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data.createdAt])

  return (
    <div
      onClick={goToPost}
      className='
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      '
    >
      <div className='flex flex-row items-start gap-3'>
        <Avatar usersId={data.user.id} />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              onClick={goToUser}
              className='
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            '
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className='
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            '
            >
              @{data.user.username}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
          <div className='flex flex-row items-center mt-3 gap-10'>
            <div
              className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            '
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            '
            >
              <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
