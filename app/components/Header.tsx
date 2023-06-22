'use client'

import {useTheme} from 'next-themes'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'
import {BiArrowBack} from 'react-icons/bi'

interface HeaderProps {
  showBackArrow?: boolean
  label: string
}

const Header: React.FC<HeaderProps> = ({showBackArrow, label}) => {
  const router = useRouter()

  const handleBack = useCallback(() => {
    router.back()
  }, [router])
  const {resolvedTheme} = useTheme()
  const [iconColor, setIconColor] = useState('')

  useEffect(() => {
    setIconColor(resolvedTheme === 'dark' ? 'black' : 'white')
  }, [resolvedTheme])


  return (
    <div className='border-b-[1px] border-neutral-800 p-5 select-none'>
      <div className='flex flex-row items-center gap-2'>
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color={iconColor}
            size={20}
            className='
              cursor-pointer 
              hover:opacity-70 
              transition
    
          '
          />
        )}
        <h1 className='text-white text-xl font-semibold  dark:text-[#120808] dark:font-[500]'>
          {label}
        </h1>
      </div>
    </div>
  )
}

export default Header
