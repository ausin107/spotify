import Sidebar from './Sidebar'
import MusicPlayer from './MusicPlayer'
import Navbar from './Navbar'
import Toasts from './Toasts'
import SearchNavBar from './SearchNavBar'
import BottomBar from './BottomBar'
export default function Layout({ children }) {
  return (
    <div className='bg-bgColor h-fit flex flex-col select-none'>
      <Sidebar />
      <Navbar />
      <div
        className='bg-bgColor overflow-hidden flex flex-col lg:left-[16.666%] lg:w-[82.4vw] w-screen h-full relative'
        id='container'>
        <SearchNavBar />
        {children}
      </div>
      <Toasts />
      <MusicPlayer />
      <BottomBar />
    </div>
  )
}
