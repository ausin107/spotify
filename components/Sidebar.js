import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
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
  const [isShowLogin, setShowLogin] = useState(false)
  const router = useRouter()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const bannerRef = useRef([])
  const hanldeAuth = (bannerId) => {
    if (isAuth) {
      router.push('/library')
    } else {
      bannerRef.current.map((item, index) => {
        if (index == bannerId) {
          item.classList.toggle('hiddenBanner')
        } else {
          item.classList.add('hiddenBanner')
        }
      })
    }
  }
  return (
    <div className='bg-black fixed h-screen lg:w-2/12 z-20 select-none'>
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
          <div className='relative'>
            <div
              onClick={() => hanldeAuth(0)}
              className='text-iconColor mb-4 flex font-semibold icon-class'>
              {router.pathname != '/library' ? (
                <LibraryIcon className='fill-iconColor mr-4 font-semibold' />
              ) : (
                <LibraryIconActive className='fill-white mr-4' />
              )}
              Library
            </div>
            <div
              ref={(el) => (bannerRef.current[0] = el)}
              className='p-4 rounded-md z-10 bg-banner2LoginBg w-80 absolute -top-4 left-32 transition-all duration-500 opacity-100 hiddenBanner'>
              <div className='text-white text-xl mb-3 font-bold'>Enjoy your Library</div>
              <div className='text-white mb-6 font-semibold'>
                Login to watch your playlist, video and create awesome playlists.
              </div>
              <div className='flex justify-end items-center'>
                <div
                  className='text-white hover:scale-105 font-bold mr-4 cursor-pointer'
                  onClick={() => hanldeAuth(0)}>
                  Later
                </div>
                <Link href='/login'>
                  <div className='text-black hover:scale-105 font-bold bg-white py-3 px-8 rounded-full flex items-center justify-center cursor-pointer'>
                    Login
                  </div>
                </Link>
              </div>
              <div className='triangle'></div>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='relative'>
            <div
              onClick={() => hanldeAuth(1)}
              className='flex text-iconColor mb-4 font-semibold items-center icon-class'>
              <div className='bg-iconColor mr-4 p-[0.4rem] rounded icon-bg'>
                <PlusIcon className='fill-black' />
              </div>
              Create playlist
            </div>
            <div
              ref={(el) => (bannerRef.current[1] = el)}
              className='p-4 rounded-md z-10 bg-banner2LoginBg w-80 absolute -top-4 left-44 transition-all duration-500 opacity-100 hiddenBanner'>
              <div className='text-white text-xl mb-3 font-bold'>Enjoy your Library</div>
              <div className='text-white mb-6 font-semibold'>
                Login to watch your playlist, video and create awesome playlists.
              </div>
              <div className='flex justify-end items-center'>
                <div
                  className='text-white hover:scale-105 font-bold mr-4 cursor-pointer'
                  onClick={() => hanldeAuth(1)}>
                  Later
                </div>
                <Link href='/login'>
                  <div className='text-black hover:scale-105 font-bold bg-white py-3 px-8 rounded-full flex items-center justify-center cursor-pointer'>
                    Login
                  </div>
                </Link>
              </div>
              <div className='triangle'></div>
            </div>
          </div>
          <div className='relative'>
            <div
              onClick={() => hanldeAuth(2)}
              className='flex text-iconColor mb-4 font-semibold items-center icon-class'>
              <div className='bg-loveIconBg mr-4 p-[0.4rem] rounded'>
                <LoveIcon className='fill-iconColor' />
              </div>
              Linked song
            </div>
            <div
              ref={(el) => (bannerRef.current[2] = el)}
              className='p-4 rounded-md z-10 bg-banner2LoginBg w-80 absolute -top-4 left-44 transition-all duration-500 opacity-100 hiddenBanner'>
              <div className='text-white text-xl mb-3 font-bold'>Enjoy your Library</div>
              <div className='text-white mb-6 font-semibold'>
                Login to watch your playlist, video and create awesome playlists.
              </div>
              <div className='flex justify-end items-center'>
                <div
                  className='text-white hover:scale-105 font-bold mr-4 cursor-pointer'
                  onClick={() => hanldeAuth(2)}>
                  Later
                </div>
                <Link href='/login'>
                  <div className='text-black hover:scale-105 font-bold bg-white py-3 px-8 rounded-full flex items-center justify-center cursor-pointer'>
                    Login
                  </div>
                </Link>
              </div>
              <div className='triangle'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
