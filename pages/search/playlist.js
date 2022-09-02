import { useState, useEffect } from 'react'
import PlaylistsBody from '../../components/PlaylistsBody'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { loadPlaylistItems } from '../../lib/loadData'
import { getSingleFavoriteMusic } from '../../lib/firebaseAction'
export default function Playlist() {
  const [plData, setPlData] = useState()
  const [isLovedPl, setLovedPl] = useState(false)
  const authKey = useSelector((state) => state.auth.authKey)
  const allExtPlaylist = useSelector((state) => state.extplaylist.allExtPlaylist)
  const currentExtPlaylist = useSelector((state) => state.extplaylist.currentPlInfo)
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
    }
    getData()
  }, [currentExtPlaylist, allExtPlaylist])
  return (
    <div className=''>
      {!!plData && (
        <div className='pt-20 pb-48 px-9 flex bg-greyBg items-end'>
          <div className='w-60 h-60 shadow-3xl'>
            <img src={currentExtPlaylist.snippet.thumbnails.medium.url} alt='' className='w-60 h-60 object-cover' />
          </div>
          <div className='px-6'>
            <div
              className='uppercase text-white font-bold text-xs mb-2'
              style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
              Playlist
            </div>
            <div
              className='text-white font-bold text-8xl mb-12'
              style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
              {currentExtPlaylist.snippet.title.slice(0, 18)}
            </div>
            <div className='text-white text-xs font-bold' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
              User - {plData.length} song
            </div>
          </div>
        </div>
      )}
      {!!plData && (
        <PlaylistsBody data={plData} collectionId={currentExtPlaylist.id.playlistId} isLovedPl={isLovedPl} />
      )}
    </div>
  )
}
