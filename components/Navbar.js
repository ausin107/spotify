import { useState, useRef, useEffect } from 'react'
import { BackIcon, EmptyIcon, LogoutIcon, NextIcon, SearchIcon } from './Icon'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { logoutSuccess } from './auth/authSlice'
import { loadAllMusicArtics } from '../lib/loadData'
import { updatePLSearchData, updateSearchData, updateArtiscData, startLoading, endLoading } from './search/searchSlice'
import { loadSearchMusic, loadSearchPlaylists } from '../lib/loadData'
export default function Navbar() {
  const [currentHeight, setCurrentHeight] = useState()
  const [auth, setAuth] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()
  const router = useRouter()
  const navbarRef = useRef()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  useEffect(() => {
    const handleScroll = () => {
      setCurrentHeight(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    if (currentHeight >= 100) {
      navbarRef.current.classList.add('!bg-black')
    } else navbarRef.current.classList.remove('!bg-black')
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentHeight])
  useEffect(() => {
    setAuth(isAuth)
    if (
      router.pathname == '/collection' ||
      router.pathname == '/library' ||
      router.pathname == '/queue' ||
      router.pathname == '/search/playlist' ||
      router.pathname.includes('/playlists') ||
      router.pathname.includes('/extplaylists')
    ) {
      navbarRef.current.classList.add('bg-transparent')
      navbarRef.current.classList.remove('bg-navbarBg')
    } else {
      navbarRef.current.classList.add('bg-navbarBg')
      navbarRef.current.classList.remove('bg-transparent')
    }
  }, [router.pathname])
  const handleLogout = () => {
    dispatch(logoutSuccess())
    window.localStorage.removeItem('authKey')
    router.push('/')
    setTimeout(() => {
      router.reload()
    }, 700)
  }
  const handleSumbit = async () => {
    dispatch(startLoading())
    const musicData = await loadSearchMusic(inputValue, 50, '')
    dispatch(updateSearchData({ musicData: musicData.items }))
    const plData = await loadSearchPlaylists(inputValue, 15)
    dispatch(updatePLSearchData({ playlistData: plData.items }))
    const artistsId = musicData.items.map((item) => {
      return item.snippet.channelId
    })
    const allArtistData = await loadAllMusicArtics(artistsId)
    dispatch(updateArtiscData({ actistsData: allArtistData }))
    dispatch(endLoading())
  }
  const handleClear = () => {
    setInputValue('')
    inputRef.current.focus()
  }
  const handleEnter = (e) => {
    if (e.key == 'Enter') {
      handleSumbit()
    }
  }
  return (
    <div
      ref={navbarRef}
      className='bg-navbarBg lg:flex flex-row h-16 w-10/12 fixed left-[16.666%] hidden justify-between items-center z-20 transition-all duration-500'>
      <div className='flex items-center ml-8'>
        <div
          className='bg-black opacity-70 py-1 px-1 mr-4 rounded-full cursor-pointer'
          onClick={() => {
            window.history.back()
          }}>
          <BackIcon className='fill-white' />
        </div>
        <div
          className='bg-black opacity-70 py-1 px-1 mr-4 rounded-full cursor-pointer'
          onClick={() => {
            window.history.forward()
          }}>
          <NextIcon className='fill-white' />
        </div>
        {router.pathname.includes('/search') ? (
          <div className='flex items-center'>
            <div className='w-[22rem] bg-white rounded flex py-2 px-3 mr-2'>
              <SearchIcon height='24' width='24' className='fill-bgColor mr-2' />
              <input
                value={inputValue}
                placeholder='Type music name...'
                className='w-80 outline-none font-semibold'
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
                ref={inputRef}
              />
              <EmptyIcon className='fill-bgColor cursor-pointer' width='24' height='24' onClick={handleClear} />
            </div>
            <button
              onClick={handleSumbit}
              className='w-[4.5rem] h-10 bg-activeIcon hover:bg-activeIconHover hover:scale-105 rounded font-semibold'>
              Search
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      {auth ? (
        <div className='flex'>
          <div
            onClick={() => router.push('https://github.com/ausin107/spotify')}
            className='text-white font-bold border mr-6 border-white p-2 rounded-full hover:scale-105 hover:bg-black cursor-pointer'>
            Give me a star
          </div>
          <div
            onClick={handleLogout}
            className='text-white bg-logoutBg font-bold p-2 px-4 rounded-full hover:scale-105 cursor-pointer flex items-center justify-center mr-8'>
            <LogoutIcon width='16' height='16' className='mr-2' />
            Logout
          </div>
        </div>
      ) : (
        <div className='flex items-center'>
          <div
            onClick={() => router.push('https://github.com/ausin107/spotify')}
            className='text-white font-bold border mr-6 border-white p-2 rounded-full hover:scale-105 hover:bg-black cursor-pointer'>
            Give me a star
          </div>
          <div
            className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'
            onClick={() => router.push('https://www.spotify.com/vn-vi/download/windows/')}>
            Download
          </div>
          <div className='mr-7 border-l-[1px] border-white py-3'></div>
          <div
            className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'
            onClick={() => router.push('/signup')}>
            Register
          </div>
          <div
            className='text-black text-lg font-semibold mr-7 tracking-wide hover:scale-105 cursor-pointer bg-white p-2 px-6 rounded-full'
            onClick={() => router.push('/login')}>
            Login
          </div>
        </div>
      )}
    </div>
  )
}
