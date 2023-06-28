import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const useSearch = (dataP?: string) => {
  const {data, error, isLoading, mutate} = useSWR(
    dataP ? `/api/search/${dataP}` :  null,
    fetcher
  )

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useSearch
