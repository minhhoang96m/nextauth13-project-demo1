import axios from 'axios'
import {useCallback, useMemo} from 'react'
import {toast} from 'react-hot-toast'

import useCurrentUser from './useCurrentUser'
import useLoginModal from './useLoginModal'
import useUser from './useUser'

const useFollow = (usersId: string) => {
  const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser()
  const {mutate: mutateFetchedUser} = useUser(usersId)

  const loginModal = useLoginModal()

  const isFollowing: boolean = useMemo(() => {
    const list = currentUser?.followingIds || []

    return list.includes(usersId)
  }, [currentUser, usersId])

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      let request

      if (isFollowing) {
        request = () => axios.delete(`/api/follow/${usersId}`)
      } else {
        request = () => axios.post(`/api/follow/${usersId}`)
      }

      await request()

      mutateCurrentUser()
      mutateFetchedUser()

      toast.success('Success')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [
    currentUser,
    isFollowing,
    usersId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ])

  return {
    isFollowing,
    toggleFollow,
  }
}

export default useFollow
