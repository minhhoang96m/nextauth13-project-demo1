'use client'

import {useTheme} from 'next-themes'
import React, {useEffect, useState} from 'react'
import {Switch} from './components/ui/switch'
import { usePathname } from 'next/navigation'

interface typeChildren {
  children: React.ReactNode
}
const ThemeSwitcher = ({children}: typeChildren) => {
  const [mounted, setMounted] = useState(false)
  const {theme, setTheme} = useTheme()
  const [checked, setChecked] = useState(theme === 'dark')
  const pathname = usePathname()

  useEffect(() => {
    setChecked(theme === 'dark')
  }, [theme])

  const handleChange = () => {
    setChecked(!checked)
    setTheme(checked ? 'light' : 'dark')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <div className='relative'>
        <div>{children}</div>
        <div className=' fixed top-5 right-2 z-5 select-none md:right-12 lg:right-[32vw] xl:right-2 2xl:top-1 2xl:right-2'>
          {pathname !== '/twitter/search' ? <Switch checked={checked} onCheckedChange={handleChange} /> : <></>}
        </div>
      </div>
    </>
  )
}

export default ThemeSwitcher
