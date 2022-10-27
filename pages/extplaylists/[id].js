import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PlaylistsBody from '../../components/PlaylistsBody'
import { ArrowBackIcon } from '../../components/Icon'
import { loadPlaylistItems, loadPlaylistInfo } from '../../lib/loadData'
import { SpinIcon } from '../../components/Icon'
export default function ExtPLaylist() {
  const [plItems, setPlItems] = useState()
  const [plInfo, setPlInfo] = useState()
  const router = useRouter()
  const playListId = router.query.id
  useEffect(() => {
    const getData = async () => {
      const plInfo = await loadPlaylistInfo(playListId)
      setPlInfo(plInfo.items[0])
      let plItems = await loadPlaylistItems(playListId, 50)
      if (!!plItems.items) {
        plItems = plItems.items.filter((item) => Object.keys(item.snippet.thumbnails).length > 0)
        setPlItems(plItems)
      }
    }
    getData()
  }, [playListId])
  return (
    <>
      {!!plInfo && !!plItems ? (
        <>
          <div className='lg:pt-20 pt-16 lg:pb-48 pb-40 px-4 flex lg:flex-row flex-col bg-greyBg lg:items-center'>
            <div className='w-full lg:w-60 lg:h-60 flex justify-center sm:h-72 lg:mb-0 mb-3'>
              <img
                src={plInfo?.snippet.thumbnails.maxres.url || plInfo?.snippet.thumbnails.high.url}
                alt=''
                className='lg:w-60 lg:h-60 sm:w-72 sm:h-72 w-44 h-44 object-cover shadow-3xl'
              />
            </div>
            <div className='lg:px-6 mb-4 lg:mb-0 lg:w-3/4 lg:h-60'>
              <div
                className='uppercase text-white font-bold text-xs mb-2 lg:block hidden'
                style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                ExtPlaylist
              </div>
              <div className='text-white font-bold lg:text-7xl lg:h-[65%] text-2xl lg:mb-12 mb-2 overflow-hidden'>
                {plInfo.snippet.title}
              </div>
              <div
                className='text-iconColor text-xs font-bold'
                style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                User - {plItems?.length} song
              </div>
            </div>
          </div>
          <PlaylistsBody playlistItems={plItems} extPlaylistInfo={plInfo} isLovedPl={true} />
        </>
      ) : (
        <div className='w-full h-screen flex items-center justify-center'>
          <SpinIcon width={36} className='animate-spin text-white' />
        </div>
      )}
      <ArrowBackIcon
        width='24'
        height='24'
        className='lg:hidden fill-white absolute top-4 left-4'
        onClick={() => router.back()}
      />
    </>
  )
}
