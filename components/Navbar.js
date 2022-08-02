import { useState, useRef, useEffect } from 'react'
import { BackIcon, NextIcon } from './Icon'
import { useRouter } from 'next/router'
export default function Navbar() {
  const [currentHeight, setCurrentHeight] = useState()
  const router = useRouter()
  const navbarRef = useRef()
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
      <div className='flex items-center'>
        <div className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'>
          Premium
        </div>
        <div
          className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'
          onClick={() => router.push('https://support.spotify.com/')}>
          Hổ trợ
        </div>
        <div
          className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'
          onClick={() => router.push('https://www.spotify.com/vn-vi/download/windows/')}>
          Tải xuống
        </div>
        <div className='mr-7 border-l-[1px] border-white py-3'></div>
        <div
          className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'
          onClick={() => router.push('/signup')}>
          Đăng ký
        </div>
        <div
          className='text-black text-lg font-semibold mr-7 tracking-wide hover:scale-105 cursor-pointer bg-white p-2 px-6 rounded-full'
          onClick={() => router.push('/login')}>
          Đăng nhập
        </div>
      </div>
    </div>
  )
}
