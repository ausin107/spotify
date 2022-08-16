import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
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
import Playlists from './Playlists'
import { addMusicToPlayList } from '../lib/firebaseAction'
export default function Sidebar() {
  const router = useRouter()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const authKey = useSelector((state) => state.auth.authKey)
  const bannerRef = useRef([])
  const linkRef = useRef([])
  const hanldeAuth = (bannerId, path) => {
    if (isAuth) {
      addMusicToPlayList(`collection/${authKey}/playlists`, {})
      // router.push(path)
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
  useEffect(() => {
    const pathName = ['/', '/search', '/library', '/playlist', '/collection']
    for (let x in pathName) {
      linkRef.current[x].classList.remove('!text-white', '!font-bold')
      if (pathName[x] == router.pathname) {
        linkRef.current[x].classList.add('!text-white', '!font-bold')
      }
    }
  }, [router.pathname])
  return (
    <div className='bg-black fixed h-screen lg:w-2/12 z-20 select-none'>
      <div className='p-6 pb-4'>
        <SpotifyLogo
          onClick={() => router.push('/')}
          className='text-white text-sm w-[60%] sm:mb-8 hover:cursor-pointer'
        />
        <div className='mb-8'>
          <Link href='/'>
            <div className='text-iconColor mb-4 flex font-semibold icon-class' ref={(el) => (linkRef.current[0] = el)}>
              {router.pathname != '/' ? (
                <HomeIcon className='fill-iconColor mr-4 font-semibold' />
              ) : (
                <HomeIconActive className='fill-white mr-4' />
              )}
              Home page
            </div>
          </Link>
          <Link href='/search'>
            <div className='text-iconColor mb-4 flex font-semibold icon-class' ref={(el) => (linkRef.current[1] = el)}>
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
              onClick={() => hanldeAuth(0, '/library')}
              className='text-iconColor mb-4 flex font-semibold icon-class'
              ref={(el) => (linkRef.current[2] = el)}>
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
                <div className='text-white hover:scale-105 font-bold mr-4 cursor-pointer' onClick={() => hanldeAuth(0)}>
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
              onClick={() => hanldeAuth(1, '/playlist')}
              className='flex text-iconColor mb-4 font-semibold items-center icon-class'
              ref={(el) => (linkRef.current[3] = el)}>
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
                <div className='text-white hover:scale-105 font-bold mr-4 cursor-pointer' onClick={() => hanldeAuth(1)}>
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
              onClick={() => hanldeAuth(2, '/collection')}
              className='flex text-iconColor font-semibold items-center icon-class'
              ref={(el) => (linkRef.current[4] = el)}>
              <div className='bg-loveIconBg mr-4 p-[0.4rem] rounded'>
                {router.pathname == '/collection' ? (
                  <LoveIcon className='fill-white' />
                ) : (
                  <LoveIcon className='fill-iconColor' />
                )}
              </div>
              Favorite song
            </div>
            <div
              ref={(el) => (bannerRef.current[2] = el)}
              className='p-4 rounded-md z-10 bg-banner2LoginBg w-80 absolute -top-4 left-44 transition-all duration-500 opacity-100 hiddenBanner'>
              <div className='text-white text-xl mb-3 font-bold'>Enjoy your Library</div>
              <div className='text-white mb-6 font-semibold'>
                Login to watch your playlist, video and create awesome playlists.
              </div>
              <div className='flex justify-end items-center'>
                <div className='text-white hover:scale-105 font-bold mr-4 cursor-pointer' onClick={() => hanldeAuth(2)}>
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
      <Playlists />
    </div>
  )
}
