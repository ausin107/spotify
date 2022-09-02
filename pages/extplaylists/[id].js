import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PlaylistsBody from '../../components/PlaylistsBody'
import { loadPlaylistItems, loadPlaylistInfo } from '../../lib/loadData'
export default function ExtPLaylist() {
  const [plItems, setPlItems] = useState()
  const [plInfo, setPlInfo] = useState()
  const router = useRouter()
  const dispatch = useDispatch()
  const playListId = router.query.id
  useEffect(() => {
    const getData = async () => {
      const plInfo = await loadPlaylistInfo(playListId)
      setPlInfo(plInfo.items[0])
      const plItems = await loadPlaylistItems(playListId, 50)
      setPlItems(plItems.items)
    }
    getData()
  }, [playListId])
  return (
    <>
      {!!plInfo && !!plItems && (
        <>
          <div className='pt-20 pb-48 px-9 flex bg-greyBg items-end'>
            <div className='w-60 h-60 shadow-3xl'>
              <img src={plInfo.snippet.thumbnails.medium.url} alt='' className='w-60 h-60 object-cover' />
            </div>
            <div className='px-6'>
              <div
                className='uppercase text-white font-bold text-xs mb-2'
                style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                ExtPlaylist
              </div>
              <div
                className='text-white font-bold text-8xl mb-12'
                style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                {plInfo.snippet.title.slice(0, 18)}
              </div>
              <div className='text-white text-xs font-bold' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                User - {plItems?.length} song
              </div>
            </div>
          </div>
          <PlaylistsBody playlistItems={plItems} extPlaylistInfo={plInfo} isLovedPl={true} />
        </>
      )}
    </>
  )
}
