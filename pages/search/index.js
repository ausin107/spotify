import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ChannelRow from '../../components/ChannelRow'
import TopResult from '../../components/TopResult'
import { SpinIcon } from '../../components/Icon'
import DefaultSearch from '../../components/DefaultSearch'
import MusicsList from '../../components/MusicsList'
export default function Search() {
  let { musicData, artistData, isLoading } = useSelector((state) => state.search)
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
          {!!musicData && !!artistData ? (
            <>
              <TopResult musicData={musicData} />
              <ChannelRow artistData={artistData} />
              <MusicsList data={musicData} />
            </>
          ) : (
            <DefaultSearch />
          )}
        </>
      )}
    </div>
  )
}
