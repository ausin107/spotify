import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MusicPlayer from '../components/MusicPlayer'
import { useSelector } from 'react-redux'
import { PlayIcon } from '../components/Icon'
import SearchMusicItem from '../components/SearchMusicItem'
import ChannelRow from '../components/ChannelRow'
export default function Search() {
  const [music, setMusic] = useState()
  const musicData = useSelector((state) => state.search.musicData)
  useEffect(() => {
    document.title = 'Spotify - Search'
  }, [])
  useEffect(() => {
    setMusic(musicData)
  }, [musicData])
  return (
    <div className='bg-bgColor h-fit flex flex-col'>
      <Sidebar />
      <Navbar />
      <div className='left-[16.666%] w-[82vw] overflow-hidden h-full relative bg-bgColor pb-24'>
        {!!music && (
          <div className='flex pt-24 relative px-8 w-screen mb-10'>
            <div className='w-[30%]'>
              <div className='text-2xl font-bold text-white mb-7'>Top Result</div>
              <div className='group bg-itemBg hover:bg-itemActiveBg rounded pl-5 py-5 relative transition-all duration-300'>
                <img
                  className='rounded w-48 mb-8 shadow-2xl'
                  src={music[0].snippet.thumbnails.medium.url}
                />
                <div className='font-bold text-2xl text-white mb-4'>
                  {!!music &&
                    music[0].snippet.title.slice(0, music[0].snippet.title.indexOf('|')).trim()}
                </div>
                <div className='flex items-center'>
                  <div className='text-iconColor text-sm font-bold mr-3'>
                    {music[0].snippet.channelTitle.replace('Official', '').trim()}
                  </div>
                  <div className='px-3 bg-black text-white uppercase text-sm font-bold rounded-full py-1'>
                    Music
                  </div>
                </div>
                <div
                  className='group-hover:visible group-hover:translate-y-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 invisible translate-y-5 opacity-0 p-3 d-flex bg-playIconBg absolute rounded-full right-6 bottom-6 cursor-pointer'
                  // onClick={handleShow}
                >
                  <PlayIcon width='24' height='24' className='fill-black' />
                </div>
              </div>
            </div>
            <div className='w-[52%] pl-8'>
              <div className='text-2xl font-bold text-white mb-7'>Music</div>
              <div className='flex flex-col'>
                {music.map((item, index) => {
                  if (index < 4) {
                    return <SearchMusicItem musicData={item} key={index} />
                  }
                })}
              </div>
            </div>
          </div>
        )}
        {!!music && <ChannelRow artistData={music} />}
      </div>
      <MusicPlayer />
    </div>
  )
}
