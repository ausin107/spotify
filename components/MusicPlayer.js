import ReactPlayer from 'react-player'
import { useRef, useState } from 'react'
import {
  PlayIcon,
  PauseIcon,
  MixMusic,
  LoopMusic,
  BackMusic,
  NextMusic,
  VolumeIconMuted,
  VolumeIconLow,
  VolumeIconHigh,
  VolumeIconMedium,
  MinimizeBrowserIcon,
} from './Icon'
import LoveButton from './LoveButton'
import Duration from './Duration'
import { playMusic, pauseMusic } from './music_player/musicPlayerSlice'
import { useSelector, useDispatch } from 'react-redux'
export default function MusicPlayer() {
  const [isLoop, setLoop] = useState(false)
  const [isPIP, setPIP] = useState(false)
  const [played, setPlayed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const musicInput = useRef()
  const loopIConRef = useRef()
  const playerRef = useRef()
  const volumeRef = useRef()
  const pipRef = useRef()
  const dispatch = useDispatch()
  const isShow = useSelector((state) => state.player.isShow)
  const musicData = useSelector((state) => state.player.musicData)
  const musicId = useSelector((state) => state.player.musicId)
  const isPlay = useSelector((state) => state.player.isPlay)
  const musicUrl = 'https://www.youtube.com/watch?v=' + musicId
  const title =
    musicData?.snippet.title.length > 55
      ? musicData?.snippet.title.slice(0, 55) + '...'
      : musicData?.snippet.title
  const handlePlayPause = () => {
    isPlay ? dispatch(pauseMusic()) : dispatch(playMusic())
  }
  const handleLoopMusic = () => {
    if (isLoop) {
      setLoop(false)
      loopIConRef.current.classList.remove('fill-activeIcon', 'hover:fill-activeIconHover')
      loopIConRef.current.classList.add('fill-musicPlayer', 'hover:fill-white')
    } else {
      setLoop(true)
      loopIConRef.current.classList.add('fill-activeIcon', 'hover:fill-activeIconHover')
      loopIConRef.current.classList.remove('fill-musicPlayer', 'hover:fill-white')
    }
  }
  const handlePIP = () => {
    if (isPIP) {
      setPIP(false)
      pipRef.current.classList.remove('fill-activeIcon', 'hover:fill-activeIconHover')
      pipRef.current.classList.add('fill-musicPlayer', 'hover:fill-white')
    } else {
      setPIP(true)
      pipRef.current.classList.add('fill-activeIcon', 'hover:fill-activeIconHover')
      pipRef.current.classList.remove('fill-musicPlayer', 'hover:fill-white')
    }
  }
  const handleProgress = (state) => {
    musicInput.current.style.backgroundSize = (state.playedSeconds / duration) * 100 + '%'
    setPlayed(state.played)
  }
  const handleChange = (e) => {
    setPlayed(e.target.value)
    musicInput.current.style.backgroundSize = e.target.value * 100 + '%'
  }
  const handleSeekMouseUp = (e) => {
    playerRef.current.seekTo(e.target.value, 'fraction')
  }
  const handleSetVolume = (e) => {
    setVolume(e.target.value)
    volumeRef.current.style.backgroundSize = e.target.value * 100 + '%'
  }
  const handleVolumeIcon = () => {
    if (volume > 0 && volume < 0.3) {
      return <VolumeIconLow className='fill-musicPlayer hover:fill-white' width='16' height='16' />
    } else if (volume >= 0.3 && volume < 0.6) {
      return (
        <VolumeIconMedium className='fill-musicPlayer hover:fill-white' width='16' height='16' />
      )
    } else if (volume >= 0.6) {
      return <VolumeIconHigh className='fill-musicPlayer hover:fill-white' width='16' height='16' />
    } else {
      return (
        <VolumeIconMuted className='fill-musicPlayer hover:fill-white' width='16' height='16' />
      )
    }
  }
  const handleMuted = () => {
    if (volume != 0) {
      volumeRef.current.style.backgroundSize = '0%'
      setVolume(0)
    } else {
      volumeRef.current.style.backgroundSize = '50%'
      setVolume(0.5)
    }
  }
  const handleBack = () => {
    const playedTime = (playerRef.current.getCurrentTime() - 5) / duration
    playerRef.current.seekTo(playedTime, 'fraction')
  }
  const handleNext = () => {
    const playedTime = (playerRef.current.getCurrentTime() + 5) / duration
    playerRef.current.seekTo(playedTime, 'fraction')
  }
  return (
    <div id='music-player' className='fixed bottom-0 left-0 w-screen h-[6.5rem] z-30'>
      {isShow && (
        <div
          className=' w-screen h-[6.5rem] bg-itemBg border-t-[0.5px] border-itemActiveBg px-4 pr-8 py-2 select-none'
          onMouseDown={(e) => e.stopPropagation()}>
          <ReactPlayer
            width='0px'
            height='0px'
            url={musicUrl}
            playing={isPlay}
            onDuration={(time) => setDuration(time)}
            onProgress={(state) => handleProgress(state)}
            ref={playerRef}
            loop={isLoop}
            volume={parseFloat(volume)}
            pip={isPIP}
          />
          <div className='flex flex-row justify-between'>
            <div className='flex items-center mr-4'>
              <img
                draggable={false}
                className='rounded w-36 h-18 mr-4'
                src={musicData.snippet.thumbnails.medium.url}
              />
              <div>
                <div className='text-white text-sm font-semibold mb-2 w-60'>{title}</div>
                <div className='text-iconColor text-sm'>{musicData.snippet.channelTitle}</div>
              </div>
              <div className='flex'>
                <LoveButton musicId={musicId} musicData={musicData} />
                <MinimizeBrowserIcon
                  className='fill-musicPlayer hover:fill-white cursor-pointer'
                  width='16'
                  height='16'
                  onClick={handlePIP}
                  pipRef={pipRef}
                />
              </div>
            </div>
            <div className='flex flex-col items-center justify-around'>
              <div className='flex items-center'>
                <div className='px-3 cursor-pointer'>
                  <MixMusic className='fill-musicPlayer hover:fill-white' width='16' height='16' />
                </div>
                <div className='px-3 cursor-pointer pr-6' onClick={handleBack}>
                  <BackMusic className='fill-musicPlayer hover:fill-white' width='16' height='16' />
                </div>
                <div
                  className='bg-white p-2 w-fit rounded-full cursor-pointer hover:scale-105'
                  onClick={handlePlayPause}>
                  {isPlay ? (
                    <PauseIcon width='16' height='16' />
                  ) : (
                    <PlayIcon width='16' height='16' />
                  )}
                </div>
                <div className='px-3 cursor-pointer pl-6' onClick={handleNext}>
                  <NextMusic className='fill-musicPlayer hover:fill-white' width='16' height='16' />
                </div>
                <div className='px-3 cursor-pointer' onClick={handleLoopMusic}>
                  <LoopMusic
                    className='fill-musicPlayer hover:fill-white'
                    width='16'
                    height='16'
                    iconRef={loopIConRef}
                  />
                </div>
              </div>
              <div className='flex items-center'>
                <Duration time={parseInt(played * duration)} className='text-navbarColor text-xs' />
                <input
                  className='w-[32rem] h-1 mx-2 cursor-pointer'
                  type='range'
                  min={0}
                  max={0.999999}
                  step='any'
                  value={played}
                  onChange={(e) => handleChange(e)}
                  onMouseUp={(e) => handleSeekMouseUp(e)}
                  id='music-time-input'
                  ref={musicInput}
                />
                <Duration time={duration} className='text-navbarColor text-xs' />
              </div>
            </div>
            <div className='flex'>
              <div className='flex items-center'>
                <div onClick={handleMuted}>{handleVolumeIcon()}</div>
                <input
                  className='w-24 h-1 mx-2 cursor-pointer'
                  type='range'
                  min={0}
                  max={1}
                  step='any'
                  value={volume}
                  id='music-volume-input'
                  onChange={(e) => handleSetVolume(e)}
                  ref={volumeRef}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
