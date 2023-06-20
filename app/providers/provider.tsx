'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface typeChild {
    children: ReactNode
}
const Provider = ({children}: typeChild) => {
  return (
    <>
        <SessionProvider>
            {children}
        </SessionProvider>
    </>
   
  )
}

export default Provider