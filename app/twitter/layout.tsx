'use client'

import {Toaster} from 'react-hot-toast'
import ClientOnly from '../components/ClientOnly'
import Layout from '../components/Layout'
import EditModal from '../components/modals/EditModal'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import '../globals.css'
import Provider from '../providers/provider'

export default function TwitterLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <ClientOnly>
        <Provider>
          <Toaster />
          <RegisterModal />
          <LoginModal />
          <EditModal />
          <Layout>{children}</Layout>
        </Provider>
      </ClientOnly>
    </>
  )
}
