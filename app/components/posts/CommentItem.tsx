import {useRouter} from 'next/navigation'
import {useCallback, useMemo} from 'react'
import {formatDistanceToNowStrict} from 'date-fns'

import Avatar from '../inputs/Avatar'

interface CommentItemProps {
  data: Record<string, any>
}

const CommentItem: React.FC<CommentItemProps> = ({data = {}}) => {
  const router = useRouter()

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation()

      router.push(`/users/${data.user.id}`)
    },
    [router, data.user.id]
  )

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null
    }

    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data.createdAt])

  return (
    <div
      className='
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        dark:hover:bg-[#F3F4F6]
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
                dark:text-black
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
                dark:text-black
            '
            >
              @{data.user.username}
            </span>
            <span className='text-neutral-500 text-sm dark:text-black'>{createdAt}</span>
          </div>
          <div className='text-white mt-1 dark:text-black'>{data.body}</div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
