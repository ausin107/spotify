import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  HomeIcon,
  HomeIconActive,
  LibraryIcon,
  LibraryIconActive,
  SearchIconActive,
  SearchIcon,
  LoveMusicActive,
  LoveMusic,
} from './Icon'
import { useSelector } from 'react-redux'
export default function BottomBar() {
  const router = useRouter()
  const bannerRef = useRef()
  const linkRef = useRef([])
  const isAuth = useSelector((state) => state.auth.isAuth)
  const hanldeAuth = (path) => {
    if (isAuth) {
      router.push(path)
    } else {
      bannerRef.current.classList.toggle('hiddenBanner')
    }
  }
  useEffect(() => {
    const pathName = ['/', '/search', '/library', '/collection']
    for (let x in pathName) {
      linkRef.current[x].classList.remove('!text-white', '!font-bold')
      if (pathName[x] == router.pathname) {
        linkRef.current[x].classList.add('!text-white', '!font-bold')
      } else if (pathName[x] == '/search' && router.pathname.includes('search')) {
        linkRef.current[x].classList.add('!text-white', '!font-bold')
      }
    }
  }, [router.pathname])
  return (
    <div className='bg-bottomBarBg fixed h-20 w-screen flex justify-around lg:hidden z-30 pt-6 pb-4 bottom-0'>
      <Link href='/'>
        <div className='w-1/5 h-12 flex justify-between flex-col items-center'>
          {router.pathname == '/' ? (
            <HomeIconActive className='fill-white mb-1' />
          ) : (
            <HomeIcon className='fill-iconColor font-semibold' />
          )}
          <div className='text-xs text-iconColor font-semibold' ref={(el) => (linkRef.current[0] = el)}>
            Home
          </div>
        </div>
      </Link>
      <Link href='/search'>
        <div className='w-1/5 h-12 flex justify-between flex-col items-center'>
          {router.pathname.includes('search') ? (
            <SearchIconActive className='fill-white mb-1' />
          ) : (
            <SearchIcon height='24' width='24' className='fill-iconColor font-semibold' />
          )}
          <div className='text-xs text-iconColor font-semibold' ref={(el) => (linkRef.current[1] = el)}>
            Search
          </div>
        </div>
      </Link>
      <div className='w-1/5 h-12 flex justify-between flex-col items-center' onClick={() => hanldeAuth('/library')}>
        {router.pathname == '/library' ? (
          <LibraryIconActive className='fill-white mb-1' />
        ) : (
          <LibraryIcon className='fill-iconColor font-semibold' />
        )}
        <div className='text-xs text-iconColor font-semibold' ref={(el) => (linkRef.current[2] = el)}>
          Library
        </div>
      </div>
      <div className='w-1/5 h-12 flex justify-between flex-col items-center' onClick={() => hanldeAuth('/collection')}>
        {router.pathname == '/collection' ? (
          <LoveMusicActive height={24} width={24} className='fill-iconColor mb-1' />
        ) : (
          <LoveMusic height={24} width={24} className='fill-iconColor font-semibold' />
        )}
        <div className='text-xs text-iconColor font-semibold' ref={(el) => (linkRef.current[3] = el)}>
          Liked
        </div>
      </div>
      <div
        ref={bannerRef}
        className='p-4 rounded-md z-40 bg-banner2LoginBg w-4/5 absolute bottom-20 transition-all duration-500 opacity-100 hiddenBanner'>
        <div className='text-white text-xl mb-2 font-bold'>Enjoy your Library</div>
        <div className='text-white mb-2 font-semibold'>
          Login to watch your playlist, video and create awesome playlists.
        </div>
        <div className='flex justify-end items-center'>
          <div className='text-white font-bold cursor-pointer mr-4' onClick={() => hanldeAuth(router.pathname)}>
            Later
          </div>
          <Link href='/login'>
            <div className='text-black font-bold bg-white py-3 px-8 rounded-full flex items-center justify-between cursor-pointer'>
              Login
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
