import React from 'react'
import Sidebar from './Sidebar'
import MusicPlayer from './MusicPlayer'
import Navbar from './Navbar'
import AdvertisementBanner from './AdvertisementBanner'
export default function Layout({ children }) {
  return (
    <div className='bg-bgColor h-fit flex flex-col'>
      <Sidebar />
      <Navbar />
      <div className='bg-bgColor h-fit flex flex-col'>{children}</div>
      <AdvertisementBanner />
      <MusicPlayer />
    </div>
  )
}
