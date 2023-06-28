import React from 'react'
import Sidebar from './layout/Sidebar'
import FollowBar from './layout/FollowBar'

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className='h-screen bg-black dark:bg-white'>
      <div className=' h-full mx-auto xl:px-30 max-w-6xl
      sm:container sm:h-full sm:mx-auto sm:xl:px-30 sm:max-w-6xl
      '>
        <div className='flex flex-col h-full
        
        md:grid md:grid-cols-10 
        '>
          <Sidebar />
          <div
            className='
              col-span-8
              overflow-y-auto 
              h-[90vh]
              md:col-span-9 
              md:h-full
              md:border-x-[1px] 
              md: border-neutral-800
              lg:border-x-[1px] 
              lg:col-span-5 
              lg:h-full
   
          '
          >
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  )
}

export default Layout
