'use client'

import {Inter} from 'next/font/google'
import ThemeSwitcher from './ThemeSwitcher'
import './globals.css'
import Providers from './providers'
import ClientOnly from './components/ClientOnly'

const inter = Inter({subsets: ['latin']})

// export const metadata = {
//   title: 'Galaxy Geek',
//   description: 'My first project',
// }

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ClientOnly>
          <Providers>
            <ThemeSwitcher children={children} />
          </Providers>
        </ClientOnly>
      </body>
    </html>
  )
}
