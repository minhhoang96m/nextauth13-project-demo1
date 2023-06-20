import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import {useSession} from 'next-auth/react'

const usePosts = (usersId?: string) => {
  // const {data: usersID} = useSession()
  // const id = usersID?.user.id
  // if (usersId === id) {
  //   const url = `/api/posts/${usersId}`
  //   const {data, error, isLoading, mutate} = useSWR(url, fetcher)
  //   return {
  //     data,
  //     error,
  //     isLoading,
  //     mutate,   
  //   }
  // }
  // const url = '/api/posts'
  const url = usersId ? `/api/posts/${usersId}` : '/api/posts'
  const {data, error, isLoading, mutate} = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default usePosts
