import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import PlaylistsBody from '../../components/PlaylistsBody'
import { ArrowBackIcon } from '../../components/Icon'
import { loadPlaylistItems, loadPlaylistInfo } from '../../lib/loadData'
import { SpinIcon } from '../../components/Icon'
export default function ExtPLaylist() {
  const [plItems, setPlItems] = useState()
  const [plInfo, setPlInfo] = useState()
  const [extPlName, setExtPlName] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const playListId = router.query.id
  useEffect(() => {
    const getData = async () => {
      const plInfo = await loadPlaylistInfo(playListId)
      setPlInfo(plInfo.items[0])
      const plItems = await loadPlaylistItems(playListId, 50)
      setPlItems(plItems.items)
      let extPlTitle = plInfo?.items[0]?.snippet.title
      if (window.innerWidth < 640) {
        extPlTitle = extPlTitle?.length > 27 ? extPlTitle.slice(0, 27) + '...' : extPlTitle
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        extPlTitle = extPlTitle?.length > 50 ? extPlTitle.slice(0, 50) + '...' : extPlTitle
      } else {
        extPlTitle = extPlTitle?.length > 13 ? extPlTitle.slice(0, 13) + '...' : extPlTitle
      }
      setExtPlName(extPlTitle)
    }
    getData()
  }, [playListId])
  return (
    <>
      {!!plInfo && !!plItems ? (
        <>
          <div className='lg:pt-20 pt-16 lg:pb-48 pb-40 px-9 flex lg:flex-row flex-col bg-greyBg lg:items-end'>
            <div className='w-full lg:w-60 lg:h-60 flex justify-center sm:h-72 lg:mb-0 mb-3'>
              <img
                src={plInfo.snippet.thumbnails.medium.url}
                alt=''
                className='lg:w-60 lg:h-60 sm:w-72 sm:h-72 w-44 h-44 object-cover shadow-3xl'
              />
            </div>
            <div className='lg:px-6 mb-4 lg:mb-0'>
              <div
                className='uppercase text-white font-bold text-xs mb-2 lg:block hidden'
                style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                ExtPlaylist
              </div>
              <div
                className='text-white font-bold lg:text-8xl text-2xl lg:mb-12 mb-2 normal-case'
                style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
                {extPlName}
              </div>
              <div className='text-white text-xs font-bold' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
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
