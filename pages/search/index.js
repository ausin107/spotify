import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ChannelRow from '../../components/ChannelRow'
import MusicSearchRow from '../../components/MusicSearchRow'
import TopResult from '../../components/TopResult'
import DefaultSearch from '../../components/DefaultSearch'
export default function Search() {
  let musicData = useSelector((state) => state.search.musicData)
  const artistData = useSelector((state) => state.search.articsData)
  useEffect(() => {
    document.title = 'Spotify - Search'
  }, [])
  return (
    <div className='pb-24'>
      {!!musicData && !!artistData ? (
        <>
          <TopResult musicData={musicData} />
          <ChannelRow artistData={artistData} />
          <MusicSearchRow musicData={musicData} title='All Music' />
        </>
      ) : (
        <DefaultSearch />
      )}
    </div>
  )
}
