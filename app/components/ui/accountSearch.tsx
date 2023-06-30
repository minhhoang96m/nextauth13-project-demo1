import {forwardRef} from 'react'

import Link from 'next/link'

import Avatar from '../inputs/Avatar'

import {RingLoader} from 'react-spinners'

interface dataSearch {
  data?: string[]
  isLoading?: boolean
}

const AccountSearch = (data: dataSearch) => {
  const MyLink = forwardRef((props: any, ref?: any) => {
    let {href, children, ...rest} = props
    return (
      <Link href={href} ref={ref} {...rest}>
        {children}
      </Link>
    )
  })
  if (data.isLoading) {
    return (
      <div
        className='
      h-full
      flex 
      RingLoader
      justify-center 
      items-center 
    '
      >
        <RingLoader color='black' />
      </div>
    )
  }
  console.log(data.data?.length)
  return (
    <div>
      {data.data?.length === 0 ? (
        <p className='text-center text-black dark:text-black py-2'>
          Can't find anyone, find another one
        </p>
      ) : (
        data.data?.map((user: string | any) => (
          <MyLink
            key={user.id}
            className='flex flex-row gap-3 p-2 mt-2 hover:bg-[#F3F4F6]'
            href={`/twitter/users/${user.id}`}
          >
            <div className='flex-none'>
              <Avatar usersId={user.id} data={true} />
            </div>
            <div className='grow'>
              <div className='w-full flex flex-row gap-3  dark:text-black'>
                {user.name}
              </div>
              <div className='dark:text-black'> @ {user.username} </div>
            </div>
          </MyLink>
        ))
      )}
    </div>
  )
}

export default AccountSearch
