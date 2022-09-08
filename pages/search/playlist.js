import { useState, useEffect } from 'react'
import PlaylistsBody from '../../components/PlaylistsBody'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { BackIcon, SpinIcon } from '../../components/Icon'
import { loadPlaylistItems } from '../../lib/loadData'
import { getSingleFavoriteMusic } from '../../lib/firebaseAction'
import { endLoading } from '../../components/extPlaylists/extPlaylistsSlice'
export default function Playlist() {
  const [plData, setPlData] = useState()
  const [isLovedPl, setLovedPl] = useState(false)
  const dispatch = useDispatch()
  const authKey = useSelector((state) => state.auth.authKey)
  const allExtPlaylist = useSelector((state) => state.extplaylist.allExtPlaylist)
  const currentExtPlaylist = useSelector((state) => state.extplaylist.currentPlInfo)
  const isLoading = useSelector((state) => state.extplaylist.isLoading)
  const router = useRouter()
  useEffect(() => {
    const getData = async () => {
      const isLovedPl = await getSingleFavoriteMusic(
        `collection/${authKey}/extplaylists/${currentExtPlaylist?.id?.playlistId}`
      )
      if (!!isLovedPl) {
        const plId = isLovedPl?.playListId
        const data = await loadPlaylistItems(plId, 50)
        setPlData(data.items)
        setLovedPl(true)
      } else {
        const plId = currentExtPlaylist?.id.playlistId
        const data = await loadPlaylistItems(plId, 50)
        setPlData(data.items)
        setLovedPl(false)
      }
      dispatch(endLoading())
    }
    getData()
  }, [currentExtPlaylist, allExtPlaylist])
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
            <div className='lg:pt-20 sm:pt-16 lg:pb-48 sm:pb-40 px-9 flex lg:flex-row flex-col bg-greyBg lg:items-end'>
              <div className='w-full lg:w-60 lg:h-60 sm:h-72 flex sm:justify-center lg:mb-0 sm:mb-3'>
                <img
                  src={currentExtPlaylist.snippet.thumbnails.medium.url}
                  alt=''
                  className='lg:w-60 lg:h-60 sm:w-72 sm:h-72 object-cover shadow-3xl'
                />
              </div>
              <div className='lg:px-6 sm:mb-4 lg:mb-0'>
                <div
                  className='uppercase text-white font-bold text-xs mb-2 lg:block hidden'
                  style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                  Playlist
                </div>
                <div
                  className='text-white font-bold lg:text-8xl sm:text-2xl lg:mb-12 sm:mb-2 normal-case'
                  style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                  {currentExtPlaylist.snippet.title.slice(0, 15)}
                </div>
                <div className='text-white text-xs font-bold' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                  User - {plData.length} song
                </div>
              </div>
            </div>
          )}
          {!!plData && !!currentExtPlaylist && (
            <PlaylistsBody playlistItems={plData} extPlaylistInfo={currentExtPlaylist} isLovedPl={isLovedPl} />
          )}
        </>
      )}
    </>
  )
}
