'use client'

import {useTheme} from 'next-themes'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {BsTwitter} from 'react-icons/bs'

const SidebarLogo = () => {
  const router = useRouter()
  const {resolvedTheme} = useTheme()
  const [iconColor, setIconColor] = useState('')

  useEffect(() => {
    setIconColor(resolvedTheme === 'dark' ? '#1BB7FF' : 'white')
  }, [resolvedTheme])
  return (
    <div
      onClick={() => router.push('/')}
      className='
        hidden
        rounded-full 
        h-14
        w-14
        p-4
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer

        md:absolute
        md:block
        md:top-[-3em]
        md:left-[5.3em]

        lg:block
        lg:top-[-45px]
        lg:left-[-4px]
    '
    >
      <BsTwitter size={28} color={iconColor} />
    </div>
  )
}

export default SidebarLogo
