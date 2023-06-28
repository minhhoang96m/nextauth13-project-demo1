'use client'

import {signOut} from 'next-auth/react'
import {BiLogOut} from 'react-icons/bi'
import {BsBellFill, BsHouseFill} from 'react-icons/bs'
import {FaSearch, FaUser} from 'react-icons/fa'

import useCurrentUser from '@/hooks/useCurrentUser'

import SidebarItem from './SidebarItem'
import SidebarLogo from './SidebarLogo'
import SidebarTweetButton from './SidebarTweetButton'

const Sidebar = () => {
  const {data: currentUser, mutate: mutateUser} = useCurrentUser()
  mutateUser()
  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/twitter',
    },
    {
      icon: FaSearch,
      label: 'Explore',
      href: `twitter/search`,
      auth: true,
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: 'twitter/notifications',
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `twitter/users/${currentUser?.id}`,
      auth: true,
    },
  ]

  return (
    <div className='col-span-1 lg:col-span-2 pr-4 md:pr-6 select-none'>
      <div className='absolute z-10 top-[91vh] left-[19.5vw]
      md:absolute md:top-[3.5em] md:left-[-4em]  
      lg:relative lg:top-[6vh] lg:left-[0] '>
        <div className='flex flex-row justify-center items-start space-y-2 w-[230px]
         md:flex md:flex-col md:items-center 
         lg:flex lg:flex-col lg:items-start   '>
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label='Logout'
              href='/twitter'
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
