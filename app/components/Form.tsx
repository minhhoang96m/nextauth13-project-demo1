'use client'

import axios from 'axios'
import {useCallback, useState} from 'react'
import {toast} from 'react-hot-toast'

import useLoginModal from '@/hooks/useLoginModal'
import usePost from '@/hooks/usePost'
import usePosts from '@/hooks/usePosts'
import useRegisterModal from '@/hooks/useRegisterModal'

import {useSession} from 'next-auth/react'
import Avatar from './inputs/Avatar'
import Button from './inputs/Buttons'

interface FormProps {
  placeholder: string
  isComment?: boolean
  postId?: string
}

const Form: React.FC<FormProps> = ({placeholder, isComment, postId}) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const {data: currentUser} = useSession()
  const userId = currentUser?.user.id

  const {mutate: mutatePosts} = usePosts(postId)
  const {mutate: mutatePost} = usePost()

  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      const url = isComment ? `/api/comments/${postId}` : '/api/posts'

      await axios.post(url, {data: {userId, body}})

      toast.success('Tweet created')

      setBody('')

      mutatePost()

      mutatePosts()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [body, mutatePosts, isComment, userId, postId, mutatePost])

  return (
    <div
      className='hidden sm:block sm:border-b-[1px] sm:border-neutral-800 sm:px-5 sm:py-2'
    >
      {currentUser ? (
        <div
          className='flex flex-row gap-4'
        >
          <div>
            <Avatar usersId={currentUser?.user.id} />
          </div>
          <div className='w-full'>
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className='
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
                dark:bg-white
                dark:text-black
                
              '
              placeholder={placeholder}
            ></textarea>
            <hr
              className='
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition'
            />
            <div className='mt-4 flex flex-row justify-end'>
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label='Tweet'
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className='text-white text-2xl text-center mb-4 font-bold dark:text-black'>
            Welcome to Twitter
          </h1>
          <div className='flex flex-row items-center justify-center gap-4'>
            <Button fullWidth label='Login' onClick={loginModal.onOpen} />
            <Button fullWidth label='Register' onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Form
