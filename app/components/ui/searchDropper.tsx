import {Menu} from '@headlessui/react'

import AccountSearch from './accountSearch'

const SearchDropper = () => {
  return (
    <Menu as='div' className='relative w-full my-2 border-none'>
      {({open}) => (
        <div>
          <Menu.Button as='div'>More</Menu.Button>
          {open && (
            <>
              <Menu.Items static as='div' className='absolute z-40 bg-blue-500 shadow-lg shadow-blue-500/50 0px 0px 15px  w-full'>
                <Menu.Item as='div'>
                  <AccountSearch />
                  <AccountSearch />
                  <AccountSearch />
                  <AccountSearch />
                  <AccountSearch />
                </Menu.Item>
              </Menu.Items>
            </>
          )}
        </div>
      )}
    </Menu>
  )
}

export default SearchDropper
