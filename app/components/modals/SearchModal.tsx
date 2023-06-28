'use client'

import {BiSearch} from 'react-icons/bi'

import {useEffect, useRef, useState} from 'react'
import {FaCircleXmark} from 'react-icons/fa6'

import useDebounce from '@/hooks/useDebounce'
import * as Tooltip from '@radix-ui/react-tooltip'
import AccountSearch from '../ui/accountSearch'

import axios from 'axios'
import useSearchModalPage from '@/hooks/useSearchModalPage'

const SearchModal = () => {
  const searchModal = useSearchModalPage()

  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const debounce = useDebounce(searchValue, 2000)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    setSearchValue('')

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    const searchQuery = debounce.split(' ').join('').trim()
    if (!searchQuery) {
      return
    }
    setIsLoading(true)

    const fletchApi = async () => {
      setIsLoading(true)

      const request = await axios.post(`/api/search/${searchQuery}`)

      setSearchResult(request.data)

      setIsLoading(false)
    }
    fletchApi()
  }, [debounce])

  const handleOnChange = (e: any) => {
    const searchValue = e.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={searchModal.isOpen }>
        <Tooltip.Trigger asChild={true}>
          <div
            onClick={searchModal.onOpen}
            className='
        border-[1px] 
        w-full 
        md:w-auto 
        py-[5px] 
        my-2
        rounded-full 
        shadow-sm 
        transition 
        cursor-pointer
        dark:bg-white
      '
          >
            <div
              className='
          w-full
          flex 
          flex-row 
          justify-between 
        '
            >
              <div
                className='
            text-sm 
            pl-2 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-5
          '
              >
                <div
                  className='
              p-2 
              bg-sky-500
              rounded-full 
              text-white
            '
                >
                  <BiSearch size={18} />
                </div>

                <div className='w-full select-none '>
                  <input
                    disabled={isLoading}
                    onChange={handleOnChange}
                    value={searchValue}
                    placeholder='Search'
                    type='text'
                    ref={inputRef}
                    className='
            w-[67vw]
            md:w-[67vw]
            lg:w-[35vw]
            xl:w-[33vw]
            2xl:w-[16.5vw]
            min-h-[34px]
            text-sm 
            bg-black 
            rounded-md
            outline-none
            text-white
            transition
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
            focus:border-transparent
            focus:outline-none
            dark:bg-white
            dark:text-black
            dark:border-none
            
          '
                  />
                </div>

                {searchValue && (
                  <button onClick={handleClick}>
                    <FaCircleXmark size='26' color='#0CA5E9' />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className='z-50 w-[100vw] h-[100vh]
             md:w-[80vw]  
             lg:w-[45vw] lg:h-[100vh] 
             xl:w-[41vw]
             2xl:w-[21vw]
             data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade 
             data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade 
             text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
             will-change-[transform,opacity]'
            sideOffset={5}
            onPointerDownOutside={() => {
              searchModal.onClose()
            }}
          >
            {searchValue ? (
              <AccountSearch data={searchResult} isLoading={isLoading} />
            ) : (
              <p className='text-[12px] text-center dark:text-black'>
                Try searching for people, topics, or keywords
              </p>
            )}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default SearchModal
