import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import DateConvert from './DateConvert'
import Duration from './Duration'
import LoveButton from './LoveButton'
import { loadItemsSuccess } from './collection/collectionSlice'
import { PlayIcon, PauseIcon, TrashCanIcon } from './Icon'
import { loadMusicData } from '../lib/loadData'
import { getCollection, deleteCollection } from './collection/collectionAction'
import { setPlayPauseMusic, setPlayList, setNotPlayList, showMusicPlayer } from './music_player/musicPlayerSlice'
import { setShow } from './toast/toastSlice'
import LazyImage from './LazyImage'
export default function PlayListItem({ data, path, index, extPlItems }) {
  const [duration, setDuration] = useState('')
  const [isHover, setHover] = useState(false)
  const [isFocus, setFocus] = useState(false)
  const { isShow, isPlay, musicId } = useSelector((state) => state.player)
  const { currentPlaylist, currentId } = useSelector((state) => state.collection)
  const authKey = useSelector((state) => state.auth.authKey)
  const dispatch = useDispatch()
  const trashRef = useRef()
  const dateRef = useRef()
  const router = useRouter()
  let channelName = data.snippet.channelTitle.replace(/Official/gi, '').trim()
  if (!!data.snippet.videoOwnerChannelTitle) {
    channelName = data.snippet.videoOwnerChannelTitle.replace(/Official/gi, '').trim()
  }
  const date = data.snippet.publishedAt.slice(0, 10)
  let itemId = typeof data.id == 'object' ? data.id.videoId : data.id
  itemId = itemId.length > 15 ? data.snippet.resourceId.videoId : itemId
  let musicName = data.snippet.title
    .replace(/Official Music Video/gi, '')
    .replace('(', '')
    .replace(')', '')
    .replaceAll('|', '')
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
      trashRef?.current?.classList.add('hidden')
    } else {
      trashRef?.current?.classList.remove('hidden')
    }
    if (router.pathname.includes('/playlists/')) {
      dateRef?.current?.classList.add('!w-[18%]')
    } else {
      dateRef?.current?.classList.remove('!w-[18%]')
    }
  }, [])
  const handlePlayPause = () => {
    if (
      router.pathname == '/collection' ||
      router.pathname.includes('/playlists/') ||
      router.pathname.includes('/extplaylists/')
    ) {
      dispatch(setPlayList())
      if (!!extPlItems) {
        dispatch(loadItemsSuccess({ data: extPlItems, index: 0 }))
      } else {
        if (isShow && musicId == itemId) {
          dispatch(setPlayPauseMusic())
        } else if (!isShow) {
          dispatch(getCollection(path, index))
        } else if (musicId != itemId) {
          dispatch(getCollection(path, index))
        }
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
    if (
      router.pathname == '/collection' ||
      router.pathname.includes('/playlists/') ||
      router.pathname.includes('/extplaylists/')
    ) {
      dispatch(setPlayList())
      if (!!extPlItems) {
        dispatch(loadItemsSuccess({ data: extPlItems, index }))
      } else {
        if (!isShow) {
          dispatch(getCollection(path, index))
        } else if (musicId != itemId) {
          dispatch(getCollection(path, index))
        }
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
    dispatch(deleteCollection(`collection/${authKey}/playlists/${currentPlaylist}/items/${itemId}`))
    dispatch(getCollection(`collection/${authKey}/playlists/${currentPlaylist}/items`, currentId))
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
        <LazyImage
          lazySrc={data?.snippet?.thumbnails?.medium?.url}
          className='h-11 w-11 object-cover shadow-2xl mr-4'
          alt='image'
        />
        <div className='max-w-[80%]'>
          <div className=''>
            {musicId == itemId ? (
              <div className='text-playIconBg whitespace-nowrap text-ellipsis overflow-hidden'>{musicName}</div>
            ) : (
              <div className='text-white whitespace-nowrap text-ellipsis overflow-hidden'>{musicName}</div>
            )}
          </div>
          <div className='text-iconColor text-sm font-semibold group-hover:text-white group-focus:text-white '>
            {channelName}
          </div>
        </div>
      </div>
      <div className='w-[25%] text-iconColor font-semibold text-sm group-hover:text-white group-focus:text-white lg:block hidden'>
        <div className='whitespace-nowrap text-ellipsis overflow-hidden max-w-[85%]'>{musicName}</div>
      </div>
      <div className='w-1/5 lg:block hidden' ref={dateRef}>
        <DateConvert className='text-iconColor font-semibold text-sm' data={date} />
      </div>
      <div className='flex justify-end items-center lg:w-[12%] sm:w-[25%] w-[10%]'>
        <LoveButton musicId={itemId} musicData={data} className='sm:mr-4 cursor-pointer lg:w-[15%] sm:w-[11%] w-3/5' />
        <Duration isoTime={duration} className='text-navbarColor font-semibold w-[35%] sm:block hidden' />
      </div>
      <div
        className='lg:w-[2%] w-[10%] justify-end lg:invisible lg:group-hover:visible lg:group-focus:visible cursor-pointer flex'
        onClick={hanldeRemove}
        ref={trashRef}>
        <TrashCanIcon className='text-iconColor w-4 hover:text-white' />
      </div>
    </div>
  )
}
