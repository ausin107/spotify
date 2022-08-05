import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MusicPlayer from '../components/MusicPlayer'
import { loadSearchMusic } from '../lib/loadData'
import { useSelector } from 'react-redux'
export default function Search() {
  const [music, setMusic] = useState('')
  const musicData = useSelector((state) => state.search.musicData)
  useEffect(() => {
    document.title = 'Spotify - Search'
  }, [])
  useEffect(() => {
    console.log(musicData)
  }, [musicData])
  return (
    <div className='bg-bgColor h-fit flex flex-col'>
      <Sidebar />
      <Navbar />
      <div className='left-[16.666%] w-[82vw] overflow-hidden h-full relative bg-bgColor pb-24'>
        <div className='h-80 bg-mainContainerBg absolute w-screen'></div>
      </div>
      <MusicPlayer />
    </div>
  )
}
