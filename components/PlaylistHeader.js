import { useState, useEffect, useRef } from 'react'
import { MusicIconV2 } from './Icon'
import { getSinglePlaylistsInfo } from '../lib/firebaseAction'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import EditPlaylistDetail from './EditPlaylistDetail'
import { ArrowBackIcon } from './Icon'
export default function PlaylistHeader({ data, path }) {
  const [isShowEditForm, setShow] = useState(false)
  const [currentData, setCurrentData] = useState()
  const router = useRouter()
  const allPlaylist = useSelector((state) => state.playlist.allPlaylist)
  useEffect(() => {
    const getPlaylistInfo = async () => {
      const result = await getSinglePlaylistsInfo(path)
      setCurrentData(result)
    }
    getPlaylistInfo()
  }, [router.query.id, allPlaylist])
  const handleShowEditForm = () => {
    setShow(true)
    const containerRef = document.querySelector('#container')
    containerRef.classList.toggle('!h-screen')
  }
  const handleClose = () => {
    setShow(false)
    const containerRef = document.querySelector('#container')
    containerRef.classList.toggle('!h-screen')
  }
  return (
    <div className='pt-20 pb-48 lg:px-9 sm:px-6 flex bg-greyBg lg:items-end sm:items-start lg:flex-row sm:flex-col'>
      <div className='w-full lg:w-60 flex justify-center lg:block sm:mb-4 lg:mb-0'>
        <div className='lg:w-60 lg:h-60 sm:w-72 sm:h-72 shadow-3xl bg-itemActiveBg flex items-center justify-center'>
          <MusicIconV2 width='65' height='65' className='fill-textBreakLine' />
        </div>
      </div>
      <div className='lg:px-6'>
        <div
          className='uppercase text-white font-bold text-xs mb-2 lg:block hidden'
          style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
          Playlist
        </div>
        <div
          className='text-white font-bold lg:text-8xl sm:text-2xl lg:mb-12 sm:mb-2 cursor-pointer '
          style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}
          onClick={handleShowEditForm}>
          {currentData && currentData.title}
        </div>
        <div className='text-iconColor text-sm font-semibold mb-3 cursor-pointer' onClick={handleShowEditForm}>
          {!!currentData && currentData.description}
        </div>
        <div className='text-white text-xs font-bold' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
          User - {data.length || 0} song
        </div>
      </div>
      <ArrowBackIcon
        width='24'
        height='24'
        className='lg:hidden fill-white absolute top-4 left-4'
        onClick={() => router.back()}
      />
      {isShowEditForm && <EditPlaylistDetail currentData={currentData} path={path} handleClose={handleClose} />}
    </div>
  )
}
