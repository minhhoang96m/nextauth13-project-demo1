'use client'

import {useState} from 'react'

import usePostModal from '@/hooks/usePostModal'
import Modal from './Modal'

import usePost from '@/hooks/usePost'

import {useSession} from 'next-auth/react'

import axios from 'axios'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
import Avatar from '../inputs/Avatar'

const PostModal = () => {
  const {data: currentUser} = useSession()

  const postModal = usePostModal()
  const [isLoading, setIsLoading] = useState(false)

  const {mutate: mutatePost} = usePost()

  const [bodyText, setBodyText] = useState('')

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const body: string = data.title
    const userId = currentUser?.user.id

    try {
      setIsLoading(true)

      const url = '/api/posts'

      await axios.post(url, {data: {body, userId}})

      toast.success('Tweet created')

      setBodyText('')

      mutatePost()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const bodyContent = (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2 select-none'>
      <div className='flex flex-row gap-4'>
        <div>
          <Avatar usersId={currentUser?.user.id as string} />
        </div>
        <div className='w-full'>
          <textarea
            {...register('title')}
            name='title'
            disabled={isLoading}
            onChange={(event) => setBodyText(event.target.value)}
            value={bodyText}
            className='
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                bg-white 
                text-black
                dark:bg-white 
                dark:text-black
              '
            placeholder='What is happening?'
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
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      bodyTitle={!bodyText}
      isOpen={postModal.isOpen}
      actionLabel='Tweet'
      onClose={postModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  )
}

export default PostModal
