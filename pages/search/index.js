import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChannelRow from '../../components/ChannelRow'
import MusicSearchRow from '../../components/MusicSearchRow'
import TopResult from '../../components/TopResult'
import DefaultSearch from '../../components/DefaultSearch'
import SearchPageLayout from '../../components/SearchPageLayout'
export default function Search() {
  const [music, setMusic] = useState()
  let musicData = useSelector((state) => state.search.musicData)
  useEffect(() => {
    document.title = 'Spotify - Search'
  }, [])
  useEffect(() => {
    setMusic(musicData)
  }, [musicData])
  return (
    <div className='pb-24'>
      {!!music ? (
        <>
          <TopResult musicData={music} />
          <ChannelRow artistData={music} />
          <MusicSearchRow musicData={music} title='All Music' />
        </>
      ) : (
        <DefaultSearch />
      )}
    </div>
  )
}
Search.getLayout = (page) => <SearchPageLayout>{page}</SearchPageLayout>
