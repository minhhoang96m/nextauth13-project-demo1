import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useNotifications = (usersId?: string) => {
  const url = usersId ? `/api/notifications/${usersId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useNotifications;
