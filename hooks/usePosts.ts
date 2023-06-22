import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const usePosts = (postId?: string) => {

  const url = postId ? `/api/post/${postId}` : null 
  const {data, error, isLoading, mutate} = useSWR(url, fetcher)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default usePosts
