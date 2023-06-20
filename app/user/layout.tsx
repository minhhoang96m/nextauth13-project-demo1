import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import Navbar from '../components/navbar/Navbar'
import '../globals.css'
import ToasterProvider from '../providers/ToasterProvider'

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <>
      <ClientOnly>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
      </ClientOnly>
      <div className='pb-20 pt-28'>{children}</div>
    </>
  )
}
