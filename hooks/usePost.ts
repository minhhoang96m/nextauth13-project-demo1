import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const usePost = (usersId?: string) => {
  const {data, error, isLoading, mutate} = useSWR(
    usersId ? `/api/posts/${usersId}` :  `/api/posts`,
    fetcher
  )

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default usePost
