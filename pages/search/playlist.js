import { useState, useEffect } from 'react'
import PlaylistsBody from '../../components/PlaylistsBody'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import LazyImage from '../../components/LazyImage'
import { BackIcon, SpinIcon } from '../../components/Icon'
import { loadPlaylistItems } from '../../lib/loadData'
import { getSingleFavoriteMusic } from '../../lib/firebaseAction'
import { endLoading } from '../../components/extPlaylists/extPlaylistsSlice'
export default function Playlist() {
  const [plData, setPlData] = useState()
  const [isLovedPl, setLovedPl] = useState(false)
  const dispatch = useDispatch()
  const authKey = useSelector((state) => state.auth.authKey)
  const { allExtPlaylist, currentPlInfo, isLoading } = useSelector((state) => state.extplaylist)
  const router = useRouter()
  useEffect(() => {
    const getData = async () => {
      const isLovedPl = await getSingleFavoriteMusic(
        `collection/${authKey}/extplaylists/${currentPlInfo?.id?.playlistId}`
      )
      if (!!isLovedPl) {
        const plId = isLovedPl?.playListId
        const data = await loadPlaylistItems(plId, 50)
        setPlData(data.items)
        setLovedPl(true)
      } else {
        const plId = currentPlInfo?.id.playlistId
        const data = await loadPlaylistItems(plId, 50)
        setPlData(data.items)
        setLovedPl(false)
      }
      dispatch(endLoading())
    }
    getData()
    console.log(currentPlInfo)
  }, [currentPlInfo, allExtPlaylist])
  return (
    <>
      <BackIcon
        width='24'
        height='24'
        className='fill-white absolute top-4 left-4 block lg:hidden'
        onClick={() => router.back()}
      />
      {isLoading ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <SpinIcon width={36} className='animate-spin text-white' />
        </div>
      ) : (
        <>
          {!!plData && (
            <div className='lg:pt-20 pt-16 lg:pb-48 pb-40 sm:px-9 px-4 flex lg:flex-row flex-col bg-greyBg lg:items-center'>
              <div className='w-full lg:w-60 lg:h-60 sm:h-72 flex justify-center lg:mb-0 mb-3'>
                <LazyImage
                  lazySrc={
                    !!currentPlInfo?.snippet?.thumbnails?.maxres?.url
                      ? currentPlInfo.snippet.thumbnails.maxres.url
                      : currentPlInfo?.snippet?.thumbnails?.high?.url
                  }
                  alt='Playlist Image'
                  className='lg:w-60 lg:h-60 sm:w-72 sm:h-72 w-44 h-44 object-cover shadow-3xl'
                />
              </div>
              <div className='lg:px-6 mb-4 lg:mb-0 lg:w-3/4 lg:h-60'>
                <div
                  className='uppercase text-white font-bold text-xs mb-2 lg:block hidden'
                  style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                  Playlist
                </div>
                <div className='text-white font-bold lg:text-7xl text-2xl lg:mb-12 mb-2 normal-case lg:h-[65%] overflow-hidden'>
                  {currentPlInfo?.snippet.title}
                </div>
                <div className='text-white text-xs font-bold' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                  User - {plData.length} song
                </div>
              </div>
            </div>
          )}
          {!!plData && !!currentPlInfo && (
            <PlaylistsBody playlistItems={plData} extPlaylistInfo={currentPlInfo} isLovedPl={isLovedPl} />
          )}
        </>
      )}
    </>
  )
}
