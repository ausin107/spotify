import { useState, useEffect, useRef } from 'react'
import { PlayIcon, PauseIcon, LoveMusic, LoveMusicActive } from './Icon'
import { loadMusicData } from '../lib/loadData'
import { showMusicPlayer, setPlayPauseMusic, setNotPlayList } from './music_player/musicPlayerSlice'
import Duration from './Duration'
import LoveButton from './LoveButton'
import { useDispatch, useSelector } from 'react-redux'
export default function SearchMusicItem({ musicData }) {
  const [duration, setDuration] = useState(0)
  const [isLoved, setLoved] = useState(false)
  const isPlay = useSelector((state) => state.player.isPlay)
  const musicId = useSelector((state) => state.player.musicId)
  const dispatch = useDispatch()
  const itemRef = useRef()
  let musicName = musicData.snippet.title
    .replace('Official Music Video', '')
    .replace('(', '')
    .replace(')', '')
    .replace('|', '')
    .slice(0, musicData.snippet.title.indexOf('|'))
    .trim()
  musicName = musicName.length >= 50 ? musicName.slice(0, 50) + '...' : musicName
  useEffect(() => {
    const getDuration = async () => {
      let data = await loadMusicData(musicData.id.videoId)
      let duration = data.items[0].contentDetails.duration
      setDuration(duration)
    }
    getDuration()
  }, [musicData])
  const handleLoved = (e) => {
    e.stopPropagation()
    isLoved ? setLoved(false) : setLoved(true)
  }
  const handlePlay = () => {
    dispatch(setNotPlayList())
    itemRef.current.focus()
    const musicId = musicData.id.videoId
    const musicInfo = {
      musicId,
      musicData,
    }
    dispatch(showMusicPlayer(musicInfo))
  }
  const handlePlayPause = (e) => {
    e.stopPropagation()
    if (isPlay && musicId == musicData.id.videoId) {
      dispatch(setPlayPauseMusic())
    }
  }
  return (
    <div
      className='flex p-3 justify-between hover:bg-searchChildBg focus:bg-searchChildBg rounded items-center group cursor-pointer select-none'
      onClick={handlePlay}
      ref={itemRef}
      tabIndex={0}>
      <div className='flex items-center'>
        <div
          className='h-10 w-[4.5rem] bg-cover '
          style={{ backgroundImage: `url(${musicData.snippet.thumbnails.medium.url})` }}>
          <div
            onClick={(e) => handlePlayPause(e)}
            className='w-full h-full flex items-center justify-center group-hover:bg-searchItemBg group-focus:bg-searchItemBg'>
            {isPlay && musicId == musicData.id.videoId ? (
              <PauseIcon
                className='fill-white group-hover:visible group-focus:visible invisible'
                width='16'
                height='16'
              />
            ) : (
              <PlayIcon
                className='fill-white group-hover:visible group-focus:visible invisible'
                width='16'
                height='16'
              />
            )}
          </div>
        </div>
        <div className='flex flex-col ml-4'>
          <div className='text-white font-semibold text-sm'>{musicName}</div>
          <div className='text-iconColor text-sm font-semibold'>
            {musicData.snippet.channelTitle.replace('Official', '').trim()}
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <div onClick={(e) => handleLoved(e)} className='mr-8'>
          <LoveButton musicData={musicData} musicId={musicData.id.videoId} />
        </div>
        <Duration isoTime={duration} className='text-navbarColor font-semibold' />
      </div>
    </div>
  )
}
