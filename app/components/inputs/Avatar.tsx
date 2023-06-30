import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useCallback} from 'react'

import useUser from '@/hooks/useUser'

interface AvatarProps {
  usersId: string
  isLarge?: boolean
  hasBorder?: boolean
  data?: boolean
}

const Avatar: React.FC<AvatarProps> = ({usersId, isLarge, hasBorder, data}) => {
  const router = useRouter()

  const {data: fetchedUser} = useUser(usersId)

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation()

      const url = `twitter/users/${usersId}`

      router.push(url)
    },
    [router, usersId]
  )

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        sizes='(max-width: 768px) 100vw'
        priority={true}
        alt='Avatar'
        onClick={data ? undefined : onClick }
        src={fetchedUser?.image || fetchedUser?.profileImage || fetchedUser?.coverImage || '/images/placeholder.png'}
      />
    </div>
  )
}

export default Avatar
