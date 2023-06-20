'use client'

import {ClipLoader} from 'react-spinners'

import Header from '@/app/components/Header'
import PostFeed from '@/app/components/posts/PostFeed'
import UserBio from '@/app/components/users/UserBio'
import UserHero from '@/app/components/users/UserHero'
import useUser from '@/hooks/useUser'

const UserView = ({params}: {params: {usersId: string}}) => {
  const usersId = params.usersId

  const {data: fetchedUser, isLoading} = useUser(usersId as string)
  
  if (isLoading || !fetchedUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero usersId={usersId as string} />
      <UserBio usersId={usersId as string} />
      <PostFeed usersId={usersId as string} />
    </>
  )
}

export default UserView
