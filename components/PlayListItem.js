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
  const [musicName, setMusicName] = useState('')
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
    if (
      router.pathname == '/collection' ||
      router.pathname.includes('search') ||
      router.pathname.includes('extplaylists')
    ) {
      trashRef.current.classList.add('hidden')
    } else {
      trashRef.current.classList.remove('hidden')
    }
    const title = data.snippet.title
    let musicName = title.replace('Official Music Video', '').replace('(', '').replace(')', '').replaceAll('|', '')
    if (window.innerWidth < 640) {
      musicName = musicName.length >= 25 ? musicName.slice(0, 25) + '...' : musicName
    } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
      musicName = musicName.length >= 45 ? musicName.slice(0, 45) + '...' : musicName
    } else if (window.innerWidth >= 1024) {
      musicName = musicName.length >= 45 ? musicName.slice(0, 45) + '...' : musicName
    }
    setMusicName(musicName)
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
  const handlePlay = (e) => {
    e.stopPropagation()
    if (router.pathname == '/collection' || router.pathname.includes('/playlists/')) {
      dispatch(setPlayList())
      if (!isShow) {
        dispatch(getCollection(path, index))
      } else if (musicId != itemId) {
        dispatch(getCollection(path, index))
      }
    } else {
      dispatch(setNotPlayList())
      if (musicId != itemId) {
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
      className='flex p-2 lg:px-6 sm:px-6 px-4 items-center justify-between hover:bg-itemActiveBg focus:bg-itemActiveBg rounded group'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onClick={handlePlay}
      tabIndex={0}>
      <div className='text-iconColor font-semibold lg:w-[3%] sm:w-[5%] text-lg hidden sm:block'>{handleHover()}</div>
      <div className='flex lg:w-2/5 sm:w-[70%] w-[80%]'>
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
      <div className='w-1/4 lg:w-[30%] text-iconColor font-semibold text-sm group-hover:text-white group-focus:text-white lg:block hidden'>
        {albumName}
      </div>
      <DateConvert className='text-iconColor font-semibold text-sm w-1/5 lg:block hidden' data={date} />
      <div className='flex justify-end items-center lg:w-[10%] sm:w-[25%] w-[10%]'>
        <LoveButton musicId={itemId} musicData={data} className='sm:mr-4 cursor-pointer lg:w-[15%] sm:w-[11%] w-3/5' />
        <Duration isoTime={duration} className='text-navbarColor font-semibold w-[35%] sm:block hidden' />
      </div>
      <div
        className='w-[10%] justify-end lg:invisible lg:group-hover:visible lg:group-focus:visible cursor-pointer flex'
        onClick={hanldeRemove}
        ref={trashRef}>
        <TrashCanIcon className='text-iconColor w-4 hover:text-white' />
      </div>
    </div>
  )
}
