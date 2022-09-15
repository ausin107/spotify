import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ChannelRow from '../../components/ChannelRow'
import TopResult from '../../components/TopResult'
import { SpinIcon } from '../../components/Icon'
import MusicsList from '../../components/MusicsList'
export default function Search() {
  let { musicData, articsData, isLoading } = useSelector((state) => state.search)
  useEffect(() => {
    document.title = 'Spotify - Search'
  }, [])
  return (
    <div className='pb-24'>
      {isLoading ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <SpinIcon width={36} className='animate-spin text-white' />
        </div>
      ) : (
        <>
          {!!musicData && !!articsData ? (
            <>
              <TopResult musicData={musicData} />
              <ChannelRow artistData={articsData} />
              <MusicsList data={musicData} />
            </>
          ) : (
            <div className='h-screen flex justify-center items-center font-bold text-4xl text-white'>
              Search your music here
            </div>
          )}
        </>
      )}
    </div>
  )
}
