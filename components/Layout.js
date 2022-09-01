import Sidebar from './Sidebar'
import MusicPlayer from './MusicPlayer'
import Navbar from './Navbar'
import Toasts from './Toasts'
import SearchNavBar from './SearchNavBar'
export default function Layout({ children }) {
  return (
    <div className='bg-bgColor h-fit flex flex-col select-none'>
      <Sidebar />
      <Navbar />
      <div
        className='bg-bgColor overflow-hidden flex flex-col left-[16.666%] w-[82.4vw] h-full relative'
        id='container'>
        <SearchNavBar />
        {children}
      </div>
      <Toasts />
      <MusicPlayer />
    </div>
  )
}
