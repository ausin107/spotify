import { useState, useEffect } from 'react'
import Image from 'next/image'
import DateConvert from './DateConvert'
import Duration from './Duration'
import { LoveMusicActive, LoveMusic, PlayIcon, PauseIcon } from './Icon'
import { loadMusicData } from '../lib/loadData'
import { setPlayPauseMusic, setPlayList, setEnded } from './music_player/musicPlayerSlice'
import { setCurrentId } from './collection/collectionSlice'
import { useSelector, useDispatch } from 'react-redux'
export default function PlayListItem({ data, index }) {
  const [duration, setDuration] = useState('')
  const [isHover, setHover] = useState(false)
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
  useEffect(() => {
    const getDuration = async () => {
      const result = await loadMusicData(data.id)
      const duration = result.items[0].contentDetails.duration
      setDuration(duration)
    }
    getDuration()
  }, [])
  const handlePlayPause = () => {
    dispatch(setPlayList())
    if (isShow && musicId == data.id) {
      dispatch(setPlayPauseMusic())
    } else if (!isShow) {
      dispatch(setCurrentId(index))
    } else if (musicId != data.id) {
      dispatch(setEnded())
      dispatch(setCurrentId(index))
    }
  }
  const handleHover = () => {
    if (isHover && isPlay && musicId == data.id) {
      return (
        <PauseIcon
          className='fill-white cursor-pointer'
          width='16'
          height='16'
          onClick={handlePlayPause}
        />
      )
    } else if (!isHover && isPlay && musicId == data.id) {
      return <Image src='/playGif.gif' width='16' height='16' />
    } else if (isHover) {
      return (
        <PlayIcon
          className='fill-white cursor-pointer'
          width='16'
          height='16'
          onClick={handlePlayPause}
        />
      )
    } else if (!isPlay && musicId == data.id) {
      return <div className='text-playIconBg'>{index + 1}</div>
    } else {
      return index + 1
    }
  }
  const handleMusicName = () => {
    if (musicId == data.id) {
      return <div className='text-playIconBg'>{musicName}</div>
    } else {
      return <div className='text-white'>{musicName}</div>
    }
  }
  return (
    <div
      className='flex p-2 px-6 items-center hover:bg-itemActiveBg rounded group'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className='text-iconColor font-semibold w-[3%] text-lg'>{handleHover()}</div>
      <div className='flex w-2/5'>
        <img src={data.snippet.thumbnails.medium.url} className=' h-11 shadow-2xl mr-4' />
        <div className=''>
          <div>{handleMusicName()}</div>
          <div className='text-iconColor text-sm font-semibold group-hover:text-white'>
            {channelName}
          </div>
        </div>
      </div>
      <div className='w-1/4 text-iconColor font-semibold text-sm group-hover:text-white'>
        {musicName}
      </div>
      <DateConvert className='text-iconColor font-semibold text-sm w-1/5' data={date} />
      <div className='flex justify-end items-center w-[12%]'>
        <LoveMusicActive
          className='fill-playIconBg hover:fill-activeIconHover mr-8'
          width='16'
          height='16'
        />
        <Duration isoTime={duration} className='text-navbarColor font-semibold' />
      </div>
    </div>
  )
}
