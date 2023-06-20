import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useUser = (usersId: string) => {
  const { data, error, isLoading, mutate } = useSWR(usersId ? `/api/users/${usersId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useUser;
