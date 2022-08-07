import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PlayIcon } from '../components/Icon'
import SearchMusicItem from '../components/SearchMusicItem'
import ChannelRow from '../components/ChannelRow'
import MusicSearchRow from '../components/MusicSearchRow'
import TopResult from '../components/TopResult'
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
    <div className='left-[16.666%] w-[82vw] overflow-hidden h-full relative bg-bgColor pb-24'>
      {!!music && (
        <>
          <TopResult musicData={music} />
          <ChannelRow artistData={music} />
          <MusicSearchRow musicData={music} />
        </>
      )}
    </div>
  )
}
