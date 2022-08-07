import React from 'react'
import Sidebar from './Sidebar'
import MusicPlayer from './MusicPlayer'
import Navbar from './Navbar'
import AdvertisementBanner from './AdvertisementBanner'
import { useSelector } from 'react-redux'
export default function Layout({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth)
  return (
    <div className='bg-bgColor h-fit flex flex-col'>
      <Sidebar />
      <Navbar />
      <div className='bg-bgColor h-fit flex flex-col'>{children}</div>
      <AdvertisementBanner />
      {!isAuth && <MusicPlayer />}
    </div>
  )
}
