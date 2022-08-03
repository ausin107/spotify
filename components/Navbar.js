import { useState, useRef, useEffect } from 'react'
import { BackIcon, LogoutIcon, NextIcon, UserIcon } from './Icon'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { logoutSuccess } from './auth/authSlice'
export default function Navbar() {
  const [currentHeight, setCurrentHeight] = useState()
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
  return (
    <div
      ref={navbarRef}
      className='bg-navbarBg flex flex-row h-16 w-10/12 fixed left-[16.666%] justify-between items-center z-20 transition-all duration-500'>
      <div className='flex items-center ml-8'>
        <div className='bg-black opacity-70 py-1 mr-6 rounded-full cursor-not-allowed'>
          <BackIcon className='fill-navigateIcon' />
        </div>
        <div className='bg-black opacity-70 py-1 mr-4 rounded-full cursor-not-allowed'>
          <NextIcon className='fill-navigateIcon' />
        </div>
      </div>
      {isAuth ? (
        <div className='flex'>
          <div
            onClick={() => router.push('https://github.com/ausin107/spotify')}
            className='text-white font-bold border mr-6 border-white p-2 rounded-full hover:scale-105 hover:bg-black cursor-pointer'>
            Give me a star
          </div>
          <div
            onClick={() => dispatch(logoutSuccess())}
            className='text-white bg-logoutBg font-bold p-2 px-4 rounded-full hover:scale-105 cursor-pointer flex items-center justify-center mr-8'>
            <LogoutIcon width='16' height='16' className='mr-2' />
            Logout
          </div>
        </div>
      ) : (
        <div className='flex items-center'>
          <div className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'>
            Premium
          </div>
          <div
            className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'
            onClick={() => router.push('https://support.spotify.com/')}>
            Support
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
