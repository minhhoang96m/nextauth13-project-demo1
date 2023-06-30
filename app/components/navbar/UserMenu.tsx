'use client'

import {signOut} from 'next-auth/react'
import {useCallback, useState} from 'react'
import {AiOutlineMenu} from 'react-icons/ai'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import {User} from '@/lib/types/interface'
import Avatars from '../inputs/Avatars'
import MenuItem from './MenuItem'

interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            select-none
            hover:bg-neutral-100 
            transition 
            cursor-pointer
            dark:text-white
            dark:bg-black
            dark:hover:bg-[#1e293b]
          '
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          dark:bg-black
          '
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatars src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className='
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            dark:bg-black
          '
        >
          <div className='flex flex-col cursor-pointer dark:text-white '>
            {currentUser ? (
              <>
                <MenuItem label='Log out' onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label='Log in' onClick={loginModal.onOpen} />
                <MenuItem label='Sign up' onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
