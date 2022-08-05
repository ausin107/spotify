import { useRouter } from 'next/router'
import React from 'react'
import {
  SpotifyLogo,
  HomeIcon,
  HomeIconActive,
  SearchIcon,
  SearchIconActive,
  LibraryIcon,
  LibraryIconActive,
  PlusIcon,
  LoveIcon,
} from '../components/Icon'
import Link from 'next/link'
export default function Sidebar() {
  const router = useRouter()
  return (
    <div className='bg-black fixed h-screen lg:w-2/12 z-10'>
      <div className='p-6'>
        <SpotifyLogo
          onClick={() => router.push('/')}
          className='text-white text-sm w-[60%] sm:mb-8 hover:cursor-pointer'
        />
        <div className='mb-8'>
          <Link href='/'>
            <div className='text-iconColor mb-4 flex font-semibold icon-class'>
              {router.pathname != '/' ? (
                <HomeIcon className='fill-iconColor mr-4 font-semibold' />
              ) : (
                <HomeIconActive className='fill-white mr-4' />
              )}
              Home page
            </div>
          </Link>
          <Link href='/search'>
            <div className='text-iconColor mb-4 flex font-semibold icon-class'>
              {router.pathname != '/search' ? (
                <SearchIcon className='fill-iconColor mr-4 font-semibold ' />
              ) : (
                <SearchIconActive className='fill-white mr-4' />
              )}
              Search
            </div>
          </Link>
          <Link href='/library'>
            <div className='text-iconColor mb-4 flex font-semibold icon-class'>
              <LibraryIcon className='fill-iconColor mr-4 font-semibold' />
              <LibraryIconActive className='fill-white mr-4 hidden' />
              Library
            </div>
          </Link>
        </div>
        <div className=''>
          <div className='flex text-iconColor mb-4 font-semibold items-center icon-class'>
            <div className='bg-iconColor mr-4 p-[0.4rem] rounded icon-bg'>
              <PlusIcon className='fill-black' />
            </div>
            Create playlist
          </div>
          <div className='flex text-iconColor mb-4 font-semibold items-center icon-class'>
            <div className='bg-loveIconBg mr-4 p-[0.4rem] rounded'>
              <LoveIcon className='fill-iconColor' />
            </div>
            Linked song
          </div>
        </div>
      </div>
    </div>
  )
}
