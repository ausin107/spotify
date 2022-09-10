import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChannelRow from '../../components/ChannelRow'
import MusicSearchRow from '../../components/MusicSearchRow'
import TopResult from '../../components/TopResult'
import { SpinIcon } from '../../components/Icon'
import DefaultSearch from '../../components/DefaultSearch'
import MusicsList from '../../components/MusicsList'
export default function Search() {
  let musicData = useSelector((state) => state.search.musicData)
  const artistData = useSelector((state) => state.search.articsData)
  const isLoading = useSelector((state) => state.search.isLoading)
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
