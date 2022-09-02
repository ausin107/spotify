import { useState, useEffect, useRef } from 'react'
import { MusicIconV2 } from './Icon'
import { getSinglePlaylistsInfo } from '../lib/firebaseAction'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import EditPlaylistDetail from './EditPlaylistDetail'
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
    <div className='pt-20 pb-48 px-9 flex bg-greyBg items-end'>
      <div className='w-60 h-60 shadow-3xl bg-itemActiveBg flex items-center justify-center'>
        <MusicIconV2 width='65' height='65' className='fill-textBreakLine' />
      </div>
      <div className='px-6'>
        <div
          className='uppercase text-white font-bold text-xs mb-2'
          style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
          Playlist
        </div>
        <div
          className='text-white font-bold text-8xl mb-12 cursor-pointer'
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
      {isShowEditForm && <EditPlaylistDetail currentData={currentData} path={path} handleClose={handleClose} />}
    </div>
  )
}
