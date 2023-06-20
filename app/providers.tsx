'use client'
import {ThemeProvider} from 'next-themes'
import {useState, useEffect} from 'react'

interface Theme {
  children: React.ReactNode
}

export default function Providers({children}: Theme) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeProvider attribute='class'>{children}</ThemeProvider>
}
