import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import MusicPlayer from './MusicPlayer'
import Navbar from './Navbar'
import AdvertisementBanner from './AdvertisementBanner'
import Toasts from './Toasts'
import { useSelector, useDispatch } from 'react-redux'
export default function Layout({ children }) {
  const [auth, setAuth] = useState(false)
  const isAuth = useSelector((state) => state.auth.isAuth)
  useEffect(() => {
    setAuth(isAuth)
  }, [])
  return (
    <div className='bg-bgColor h-fit flex flex-col'>
      <Sidebar />
      <Navbar />
      <div className='bg-bgColor h-fit overflow-hidden flex flex-col' id='container'>
        {children}
      </div>
      <Toasts />
      {!auth && <AdvertisementBanner />}
      <MusicPlayer />
    </div>
  )
}
