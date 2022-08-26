import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChannelRow from '../../components/ChannelRow'
import MusicSearchRow from '../../components/MusicSearchRow'
import TopResult from '../../components/TopResult'
import DefaultSearch from '../../components/DefaultSearch'
import SearchNavBar from '../../components/SearchNavBar'
import SearchPageLayout from '../../components/SearchPageLayout'
export default function Search() {
  const [music, setMusic] = useState()
  let musicData = useSelector((state) => state.search.musicData)
  useEffect(() => {
    document.title = 'Spotify - Search'
  }, [])
  useEffect(() => {
    let showData = musicData.filter((item, index) => {
      if (index < 12) {
        return item
      }
    })
    setMusic(showData)
  }, [musicData])
  return (
    <div className='left-[16.666%] w-[82vw] overflow-hidden h-full relative bg-bgColor pb-24'>
      {!!music ? (
        <>
          <TopResult musicData={music} />
          <ChannelRow artistData={music} />
          <MusicSearchRow musicData={music} />
        </>
      ) : (
        <DefaultSearch />
      )}
    </div>
  )
}
Search.getLayout = (page) => <SearchPageLayout>{page}</SearchPageLayout>
