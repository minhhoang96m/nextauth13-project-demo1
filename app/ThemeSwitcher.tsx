'use client'

import {useTheme} from 'next-themes'
import React, {useEffect, useState} from 'react'
import {Switch} from './components/ui/switch'

interface typeChildren {
  children: React.ReactNode
}
const ThemeSwitcher = ({children}: typeChildren) => {
  const [mounted, setMounted] = useState(false)
  const {theme, setTheme} = useTheme()
  const [checked, setChecked] = useState(theme === 'dark')

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
        <div className='fixed top-[1rem] right-[0.8rem] z-5 select-none'>
          <Switch checked={checked} onCheckedChange={handleChange} />
        </div>
      </div>
    </>
  )
}

export default ThemeSwitcher
