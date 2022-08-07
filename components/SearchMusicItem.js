import { useState, useEffect, useRef } from 'react'
import { PlayIcon, PauseIcon, LoveMusic, LoveMusicActive } from './Icon'
import { loadMusicData } from '../lib/loadData'
import { showMusicPlayer, playMusic, pauseMusic } from './music_player/musicPlayerSlice'
import Duration from './Duration'
import { useDispatch, useSelector } from 'react-redux'
export default function SearchMusicItem({ musicData }) {
  const [duration, setDuration] = useState(0)
  const [isLoved, setLoved] = useState(false)
  const isPlay = useSelector((state) => state.player.isPlay)
  const musicId = useSelector((state) => state.player.musicId)
  const dispatch = useDispatch()
  const itemRef = useRef()
  useEffect(() => {
    const getDuration = async () => {
      let data = await loadMusicData(musicData.id.videoId)
      let duration = data.items[0].contentDetails.duration
      duration = duration.replace('PT', '')
      let [h, m, s] = [0, 0, 0]
      if (duration.includes('H') == false) {
        h = 0
        m = parseInt(duration.slice(0, duration.indexOf('M'))) * 60
        s = parseInt(duration.slice(duration.indexOf('M') + 1, duration.indexOf('S')))
      } else if (duration.includes('H') == true) {
        h = parseInt(duration.slice(0, duration.indexOf('H'))) * 3600
        m = parseInt(duration.slice(duration.indexOf('H') + 1, duration.indexOf('M'))) * 60
        s = parseInt(duration.slice(duration.indexOf('M') + 1, duration.indexOf('S')))
      }
      let result = h + m + s
      setDuration(result)
    }
    getDuration()
  }, [musicData])
  const handleLoved = (e) => {
    e.stopPropagation()
    isLoved ? setLoved(false) : setLoved(true)
  }
  const handlePlay = () => {
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
    isPlay && musicId == musicData.id.videoId ? dispatch(pauseMusic()) : dispatch(playMusic())
  }
  return (
    <div
      className='flex p-3 justify-between hover:bg-searchChildBg focus:bg-searchChildBg rounded items-center group cursor-pointer select-none'
      onClick={handlePlay}
      ref={itemRef}
      tabIndex={0}>
      <div className='flex items-center'>
        <div className='relative mr-4'>
          <img
            className='h-10 group-hover:opacity-25 group-focus:opacity-25'
            src={musicData.snippet.thumbnails.medium.url}
          />
          <div onClick={(e) => handlePlayPause(e)}>
            {isPlay && musicId == musicData.id.videoId ? (
              <PauseIcon
                className='fill-white group-hover:visible group-focus:visible invisible absolute top-1/3 right-2/4'
                width='16'
                height='16'
              />
            ) : (
              <PlayIcon
                className='fill-white group-hover:visible group-focus:visible invisible absolute top-1/3 right-2/4'
                width='16'
                height='16'
              />
            )}
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-white font-semibold text-sm'>
            {musicData.snippet.title.slice(0, musicData.snippet.title.indexOf('|')).trim()}
          </div>
          <div className='text-iconColor text-sm font-semibold'>
            {musicData.snippet.channelTitle.replace('Official', '').trim()}
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <div onClick={(e) => handleLoved(e)} className='mr-8'>
          {isLoved ? (
            <LoveMusicActive
              className='group-hover:visible group-focus:visible invisible fill-activeIcon hover:fill-activeIconHover cursor-pointer'
              width='16'
              height='16'
            />
          ) : (
            <LoveMusic
              className='group-hover:visible group-focus:visible invisible fill-iconColor hover:fill-white cursor-pointer'
              width='16'
              height='16'
            />
          )}
        </div>
        <Duration time={duration} className='text-navbarColor font-semibold' />
      </div>
    </div>
  )
}
