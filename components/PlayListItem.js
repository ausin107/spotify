import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import DateConvert from './DateConvert'
import Duration from './Duration'
import LoveButton from './LoveButton'
import { PlayIcon, PauseIcon, TrashCanIcon } from './Icon'
import { loadMusicData } from '../lib/loadData'
import { getCollection, deleteCollection } from './collection/collectionAction'
import { setPlayPauseMusic, setPlayList, setNotPlayList, showMusicPlayer } from './music_player/musicPlayerSlice'
import { setShow } from './toast/toastSlice'
export default function PlayListItem({ data, path, index }) {
  const [duration, setDuration] = useState('')
  const [isHover, setHover] = useState(false)
  const [isFocus, setFocus] = useState(false)
  const authKey = useSelector((state) => state.auth.authKey)
  const isShow = useSelector((state) => state.player.isShow)
  const isPlay = useSelector((state) => state.player.isPlay)
  const musicId = useSelector((state) => state.player.musicId)
  const currentPLId = useSelector((state) => state.collection.currentPlaylist)
  const currentId = useSelector((state) => state.collection.currentId)
  const isPlayList = useSelector((state) => state.player.isPlayList)
  const dispatch = useDispatch()
  const trashRef = useRef()
  const router = useRouter()
  const title = data.snippet.title
  let musicName = title.replace('Official Music Video', '').replace('(', '').replace(')', '').replaceAll('|', '')
  musicName = musicName.length >= 45 ? musicName.slice(0, 45) + '...' : musicName
  let albumName = musicName.length >= 30 ? musicName.slice(0, 30) + '...' : musicName
  const channelName = data.snippet.channelTitle.replace('Official', '').trim()
  const date = data.snippet.publishedAt.slice(0, 10)
  let itemId = typeof data.id == 'object' ? data.id.videoId : data.id
  itemId = itemId.length > 15 ? data.snippet.resourceId.videoId : itemId
  useEffect(() => {
    const getDuration = async () => {
      const result = await loadMusicData(itemId)
      const duration = result.items[0]?.contentDetails?.duration
      setDuration(duration)
    }
    getDuration()
    if (router.pathname == '/collection' || router.pathname == '/search/musics') {
      trashRef.current.classList.add('hidden')
    } else {
      trashRef.current.classList.remove('hidden')
    }
  }, [])
  const handlePlayPause = () => {
    if (router.pathname == '/collection' || router.pathname.includes('/playlists/')) {
      dispatch(setPlayList())
      if (isShow && musicId == itemId) {
        dispatch(setPlayPauseMusic())
      } else if (!isShow) {
        dispatch(getCollection(path, index))
      } else if (musicId != itemId) {
        dispatch(getCollection(path, index))
      }
    } else {
      dispatch(setNotPlayList())
      if (isShow && musicId == itemId) {
        dispatch(setPlayPauseMusic())
      } else if (musicId != itemId) {
        dispatch(showMusicPlayer({ musicData: data, musicId: itemId }))
      }
    }
  }
  const handleHover = () => {
    if ((isHover || isFocus) && isPlay && musicId == itemId) {
      return <PauseIcon className='fill-white cursor-pointer' width='16' height='16' onClick={handlePlayPause} />
    } else if ((!isHover || !isFocus) && isPlay && musicId == itemId) {
      return <Image src='/playGif.gif' width='16' height='16' />
    } else if (isHover || isFocus) {
      return <PlayIcon className='fill-white cursor-pointer' width='16' height='16' onClick={handlePlayPause} />
    } else if (!isPlay && musicId == itemId) {
      return <div className='text-playIconBg'>{index + 1}</div>
    } else {
      return index + 1
    }
  }
  const hanldeRemove = (e) => {
    e.stopPropagation()
    dispatch(deleteCollection(`collection/${authKey}/playlists/${currentPLId}/items/${itemId}`))
    dispatch(getCollection(`collection/${authKey}/playlists/${currentPLId}/items`, currentId))
    dispatch(setShow('Removed from your Favorite Songs'))
  }
  return (
    <div
      className='flex p-2 px-6 items-center hover:bg-itemActiveBg focus:bg-itemActiveBg rounded group'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      tabIndex={0}>
      <div className='text-iconColor font-semibold w-[3%] text-lg'>{handleHover()}</div>
      <div className='flex w-2/5'>
        <img src={data?.snippet?.thumbnails?.medium?.url} className='h-11 w-11 object-cover shadow-2xl mr-4' />
        <div className=''>
          <div>
            {musicId == itemId ? (
              <div className='text-playIconBg'>{musicName}</div>
            ) : (
              <div className='text-white'>{musicName}</div>
            )}
          </div>
          <div className='text-iconColor text-sm font-semibold group-hover:text-white group-focus:text-white '>
            {channelName}
          </div>
        </div>
      </div>
      <div className='w-1/4 text-iconColor font-semibold text-sm group-hover:text-white group-focus:text-white'>
        {albumName}
      </div>
      <DateConvert className='text-iconColor font-semibold text-sm w-1/5' data={date} />
      <div className='flex justify-end items-center w-[10%]'>
        <LoveButton musicId={itemId} musicData={data} />
        <Duration isoTime={duration} className='text-navbarColor font-semibold w-[35%]' />
      </div>
      <div
        className='w-[3%] flex justify-end invisible group-hover:visible group-focus:visible cursor-pointer'
        onClick={hanldeRemove}
        ref={trashRef}>
        <TrashCanIcon className='text-iconColor w-4 hover:text-white' />
      </div>
    </div>
  )
}
