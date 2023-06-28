import useUsers from '@/hooks/useUsers'

import { usePathname } from 'next/navigation'
import Avatar from '../Avatar'
import Search from '../navbar/Search'

const FollowBar = () => {
  const pathname = usePathname()

  const {data: users = []} = useUsers()

  if (users.length === 0) {
    return null
  }

  return (
    <div className='px-2 py-2 hidden md:col-span-3 lg:block col-span-3 select-none '>
      {pathname === '/twitter/search' ? <></> : <Search />}
      <div className='bg-neutral-800 rounded-xl p-4  dark:bg-gradient-to-r from-sky-500 via-blue-800 to-gray-600'>
        <h2 className='text-white text-xl font-semibold '>Who to follow</h2>
        <div className='flex flex-col gap-6 mt-4'>
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className='flex flex-row gap-4'>
              <Avatar usersId={user.id} />
              <div className='flex flex-col'>
                <p className='text-white font-semibold text-sm'>{user.name}</p>
                <p className='text-neutral-400 text-sm'>@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FollowBar
