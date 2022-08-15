import { useState, useEffect } from 'react'
import Image from 'next/image'
import DateConvert from './DateConvert'
import Duration from './Duration'
import LoveButton from './LoveButton'
import { LoveMusicActive, LoveMusic, PlayIcon, PauseIcon } from './Icon'
import { loadMusicData } from '../lib/loadData'
import { getCollection } from './collection/collectionAction'
import { setPlayPauseMusic, setPlayList, setEnded } from './music_player/musicPlayerSlice'
import { setCurrentId } from './collection/collectionSlice'
import { useSelector, useDispatch } from 'react-redux'
export default function PlayListItem({ data, index }) {
  const [duration, setDuration] = useState('')
  const [isHover, setHover] = useState(false)
  const [isFocus, setFocus] = useState(false)
  const authKey = useSelector((state) => state.auth.authKey)
  const isShow = useSelector((state) => state.player.isShow)
  const isPlay = useSelector((state) => state.player.isPlay)
  const musicId = useSelector((state) => state.player.musicId)
  const dispatch = useDispatch()
  const title = data.snippet.title
  let musicName = title
    .replace('Official Music Video', '')
    .replace('(', '')
    .replace(')', '')
    .replace('|', '')
    .slice(0, title.indexOf('|'))
    .trim()
  musicName = musicName.length >= 30 ? musicName.slice(0, 30) + '...' : musicName
  const channelName = data.snippet.channelTitle.replace('Official', '').trim()
  const date = data.snippet.publishedAt.slice(0, 10)
  let itemId = typeof data.id == 'object' ? data.id.videoId : data.id
  useEffect(() => {
    const getDuration = async () => {
      const result = await loadMusicData(itemId)
      const duration = result.items[0].contentDetails.duration
      setDuration(duration)
    }
    getDuration()
  }, [])
  const handlePlayPause = () => {
    dispatch(setPlayList())
    // dispatch(getCollection(`collection/${authKey}/items`))
    if (isShow && musicId == itemId) {
      dispatch(setPlayPauseMusic())
    } else if (!isShow) {
      dispatch(setCurrentId({ index: index }))
    } else if (musicId != itemId) {
      dispatch(setEnded())
      dispatch(setCurrentId({ index: index }))
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
        <img src={data.snippet.thumbnails.medium.url} className=' h-11 shadow-2xl mr-4' />
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
        {musicName}
      </div>
      <DateConvert className='text-iconColor font-semibold text-sm w-1/5' data={date} />
      <div className='flex justify-end items-center w-[12%]'>
        <LoveButton musicId={itemId} musicData={data} />
        <Duration isoTime={duration} className='text-navbarColor font-semibold' />
      </div>
    </div>
  )
}
