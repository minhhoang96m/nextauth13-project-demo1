'use client'

import { useTheme } from 'next-themes'
import {useRouter} from 'next/navigation'
import { useEffect, useState } from 'react'
import {BsTwitter} from 'react-icons/bs'

const SidebarLogo = () => {
  const router = useRouter()
  const {resolvedTheme} = useTheme()
  const [iconColor, setIconColor] = useState('')

  useEffect(() => {
    setIconColor(resolvedTheme === 'dark' ? 'black' : 'white')
  }, [resolvedTheme])
  return (
    <div
      onClick={() => router.push('/twitter')}
      className='
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    '
    >
      <BsTwitter size={28} color={iconColor} />
    </div>
  )
}

export default SidebarLogo
