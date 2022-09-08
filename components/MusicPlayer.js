import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from 'react'
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
  Next15s,
  Back15s,
  Playlists,
  ClosePlayerIcon,
  OptionIcons,
  ConnectDevice,
  ConnectIcon,
  ShareIcon,
} from './Icon'
import LoveButton from './LoveButton'
import Duration from './Duration'
import { setPlayPauseMusic, showMusicPlayer } from './music_player/musicPlayerSlice'
import { useSelector, useDispatch } from 'react-redux'
import { increaseCurrentId, decreaseCurrentId, loadItemsSuccess } from './collection/collectionSlice'
import SekeletonPlayer from './SekeletonPlayer'
import { useRouter } from 'next/router'
import { getCollection } from './collection/collectionAction'
export default function MusicPlayer() {
  const [isLoop, setLoop] = useState(false)
  const [isMix, setMixMusic] = useState(false)
  const [played, setPlayed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isShowPlayer, setShowPlayer] = useState(false)
  const [isShowVolumn, setShowVolumn] = useState(false)
  const [volumeIcon, setVolumeIcon] = useState(
    <VolumeIconMedium className='fill-musicPlayer hover:fill-white' width='16' height='16' />
  )
  const musicInput = useRef([])
  const loopIConRef = useRef()
  const playerRef = useRef()
  const mixMusicRef = useRef()
  const volumeRef = useRef([])
  const queueRef = useRef()
  const dispatch = useDispatch()
  const isShow = useSelector((state) => state.player.isShow)
  const musicData = useSelector((state) => state.player.musicData)
  const musicId = useSelector((state) => state.player.musicId)
  const allMusic = useSelector((state) => state.collection.items)
  const authKey = useSelector((state) => state.auth.authKey)
  const router = useRouter()
  const playListId = router.query.id
  const isPlay = useSelector((state) => state.player.isPlay)
  const isPlayList = useSelector((state) => state.player.isPlayList)
  const currentId = useSelector((state) => state.collection.currentId)
  const title =
    musicData?.snippet.title.length > 55 ? musicData?.snippet.title.slice(0, 55) + '...' : musicData?.snippet.title
  const handleReady = () => {
    setDuration(playerRef.current.getDuration())
  }
  const handleMusicUrl = () => {
    return 'https://www.youtube.com/watch?v=' + musicId
  }
  const handlePlayPause = (e) => {
    e.stopPropagation()
    dispatch(setPlayPauseMusic())
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
  const handleProgress = (state) => {
    musicInput.current.map((item) => {
      if (!!item) {
        item.style.backgroundSize = (state.playedSeconds / duration) * 100 + '%'
      }
    })
    setPlayed(state.played)
  }
  const handleChange = (e) => {
    setPlayed(e.target.value)
    musicInput.current.map((item) => {
      if (!!item) {
        item.style.backgroundSize = e.target.value * 100 + '%'
      }
    })
    playerRef.current.seekTo(e.target.value, 'fraction')
  }
  const handleSeekMouseUp = (e) => {
    playerRef.current.seekTo(e.target.value, 'fraction')
  }
  const handleSetVolume = (e) => {
    setVolume(e.target.value)
    volumeRef.current.map((item) => {
      if (!!item) {
        item.style.backgroundSize = e.target.value * 100 + '%'
      }
    })
    if (e.target.value > 0 && e.target.value < 0.3) {
      setVolumeIcon(<VolumeIconLow className='fill-musicPlayer hover:fill-white' width='16' height='16' />)
    } else if (e.target.value >= 0.3 && e.target.value < 0.6) {
      setVolumeIcon(<VolumeIconMedium className='fill-musicPlayer hover:fill-white' width='16' height='16' />)
    } else if (e.target.value >= 0.6) {
      setVolumeIcon(<VolumeIconHigh className='fill-musicPlayer hover:fill-white' width='16' height='16' />)
    } else {
      setVolumeIcon(<VolumeIconMuted className='fill-musicPlayer hover:fill-white' width='16' height='16' />)
    }
  }
  const handleMuted = () => {
    if (volume != 0) {
      volumeRef.current.map((item) => {
        if (!!item) {
          item.style.backgroundSize = '0%'
        }
      })
      setVolume(0)
      setVolumeIcon(<VolumeIconMuted className='fill-musicPlayer hover:fill-white' width='16' height='16' />)
    } else {
      volumeRef.current.map((item) => {
        if (!!item) {
          item.style.backgroundSize = '50%'
        }
      })
      setVolume(0.5)
      setVolumeIcon(<VolumeIconMedium className='fill-musicPlayer hover:fill-white' width='16' height='16' />)
    }
  }
  const handleBack = () => {
    if (isPlayList) {
      dispatch(decreaseCurrentId())
    } else {
      const playedTime = (playerRef.current.getCurrentTime() - 15) / duration
      playerRef.current.seekTo(playedTime, 'fraction')
    }
  }
  const handleNext = () => {
    if (isPlayList) {
      dispatch(increaseCurrentId())
    } else {
      const playedTime = (playerRef.current.getCurrentTime() + 15) / duration
      playerRef.current.seekTo(playedTime, 'fraction')
    }
  }
  const handleEnded = () => {
    if (isPlayList) {
      dispatch(increaseCurrentId())
    }
  }
  const handleMixMusic = () => {
    if (isPlayList) {
      if (isMix) {
        setMixMusic(false)
        mixMusicRef.current.classList.remove('fill-activeIcon', 'hover:fill-activeIconHover')
        mixMusicRef.current.classList.add('fill-musicPlayer', 'hover:fill-white')
        !!playListId
          ? dispatch(getCollection(`collection/${authKey}/playlists/${playListId}/items`))
          : dispatch(getCollection(`collection/${authKey}/items`))
      } else {
        let mixMusic = [...allMusic]
        mixMusic.sort(function () {
          return 0.5 - Math.random()
        })
        let currentMusic = allMusic.filter((index) => index == currentId)
        setMixMusic(true)
        dispatch(loadItemsSuccess({ data: [...currentMusic, ...mixMusic], index: currentId }))
        mixMusicRef.current.classList.add('fill-activeIcon', 'hover:fill-activeIconHover')
        mixMusicRef.current.classList.remove('fill-musicPlayer', 'hover:fill-white')
      }
    }
  }
  const handleShowMobilePlayer = (e) => {
    e.stopPropagation()
    isShowPlayer ? setShowPlayer(false) : setShowPlayer(true)
  }
  useEffect(() => {
    if (isPlayList) {
      !!allMusic &&
        allMusic.map((item, index) => {
          if (index == currentId) {
            let musicId = typeof item.id == 'object' ? item.id.videoId : item.id
            musicId = musicId.length > 15 ? item.snippet.resourceId.videoId : musicId
            const musicInfo = {
              musicData: item,
              musicId,
            }
            dispatch(showMusicPlayer(musicInfo))
            document.title = item.snippet.title
          }
        })
    }
  }, [currentId, allMusic])
  useEffect(() => {
    if (!!queueRef.current) {
      if (router.pathname == '/queue') {
        queueRef.current.classList.add('fill-activeIcon', 'hover:fill-activeIconHover')
        queueRef.current.classList.remove('fill-musicPlayer', 'hover:fill-white')
      } else {
        queueRef.current.classList.remove('fill-activeIcon', 'hover:fill-activeIconHover')
        queueRef.current.classList.add('fill-musicPlayer', 'hover:fill-white')
      }
    }
  }, [router.pathname])
  const handleQueue = () => {
    if (router.pathname == '/queue') {
      window.history.back()
    } else {
      router.push('/queue')
    }
  }
  return (
    <>
      <div id='music-player' className='fixed bottom-0 left-0 w-screen h-[6.5rem] z-30 hidden lg:block select-none'>
        {isShow ? (
          <div
            className=' w-screen h-[6.5rem] bg-itemBg border-t-[0.5px] border-itemActiveBg px-4 pr-8 py-2'
            onMouseDown={(e) => e.stopPropagation()}>
            <ReactPlayer
              width='0px'
              height='0px'
              url={handleMusicUrl()}
              playing={isPlay}
              onReady={handleReady}
              onProgress={(state) => handleProgress(state)}
              onEnded={handleEnded}
              ref={playerRef}
              loop={isLoop}
              volume={parseFloat(volume)}
            />
            <div className='flex flex-row justify-between h-full items-center'>
              <div className='flex items-center w-[30%]'>
                <img
                  draggable={false}
                  className='h-16 w-16 object-cover mr-4'
                  src={musicData.snippet.thumbnails.medium.url}
                />
                <div>
                  <div className='text-white text-sm font-semibold mb-2 w-60'>{title}</div>
                  <div className='text-iconColor text-sm'>{musicData.snippet.channelTitle}</div>
                </div>
                <div className='flex'>
                  <LoveButton
                    musicId={musicId}
                    musicData={musicData}
                    className='mr-4 cursor-pointer'
                    width='16'
                    height='16'
                  />
                  <MinimizeBrowserIcon
                    className='fill-musicPlayer hover:fill-white cursor-pointer'
                    width='16'
                    height='16'
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-evenly w-[55%] h-full'>
                <div className='flex items-center'>
                  <div className='px-3 cursor-pointer' onClick={handleMixMusic}>
                    <MixMusic
                      className='fill-musicPlayer hover:fill-white'
                      width='16'
                      height='16'
                      iconRef={mixMusicRef}
                    />
                  </div>
                  <div className='px-3 cursor-pointer pr-6' onClick={handleBack}>
                    {isPlayList ? (
                      <BackMusic className='fill-musicPlayer hover:fill-white' width='16' height='16' />
                    ) : (
                      <Back15s className='fill-musicPlayer hover:fill-white' width='16' height='16' />
                    )}
                  </div>
                  <div
                    className='bg-white p-2 w-fit rounded-full cursor-pointer hover:scale-105'
                    onClick={handlePlayPause}>
                    {isPlay ? <PauseIcon width='16' height='16' /> : <PlayIcon width='16' height='16' />}
                  </div>
                  <div className='px-3 cursor-pointer pl-6' onClick={handleNext}>
                    {isPlayList ? (
                      <NextMusic className='fill-musicPlayer hover:fill-white' width='16' height='16' />
                    ) : (
                      <Next15s className='fill-musicPlayer hover:fill-white' width='16' height='16' />
                    )}
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
                    ref={(el) => (musicInput.current[0] = el)}
                  />
                  <Duration time={duration} className='text-navbarColor text-xs' />
                </div>
              </div>
              <div className='flex w-[15%] items-center justify-center'>
                <Playlists
                  width='16'
                  height='16'
                  className='fill-musicPlayer hover:fill-white mr-4 cursor-pointer'
                  onClick={handleQueue}
                  iconRef={queueRef}
                />
                <div className='flex items-center'>
                  <div onClick={handleMuted} className='cursor-pointer'>
                    {volumeIcon}
                  </div>
                  <input
                    className='w-24 h-1 mx-2 cursor-pointer'
                    type='range'
                    min={0}
                    max={1}
                    step='any'
                    value={volume}
                    id='music-volume-input'
                    onChange={(e) => handleSetVolume(e)}
                    ref={(el) => (volumeRef.current[0] = el)}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SekeletonPlayer />
        )}
      </div>
      <div className='lg:hidden fixed bottom-20 left-0 w-screen z-30 select-none'>
        {isShow && (
          <div
            className='bg-itemBg h-14 w-[98%] mx-2 flex flex-col justify-end items-center rounded px-2'
            onClick={(e) => handleShowMobilePlayer(e)}>
            <div className='flex w-full mb-2 justify-between'>
              <div className='flex items-center'>
                <img
                  draggable={false}
                  className='h-10 w-10 rounded object-cover mr-4'
                  src={musicData.snippet.thumbnails.medium.url}
                />
                <div>
                  <div className='text-white text-sm font-semibold w-[35rem]'>{title}</div>
                  <div className='text-iconColor text-sm'>{musicData.snippet.channelTitle}</div>
                </div>
              </div>
              <div className='flex items-center mr-4'>
                <LoveButton musicId={musicId} musicData={musicData} className='mr-4' width='24' height='24' />
                <div className='cursor-pointer hover:scale-105' onClick={(e) => handlePlayPause(e)}>
                  {isPlay ? (
                    <PauseIcon width='20' height='20' className='fill-white' />
                  ) : (
                    <PlayIcon width='20' height='20' className='fill-white' />
                  )}
                </div>
              </div>
            </div>
            <input
              className='w-[98%] h-[2.5px]'
              type='range'
              min={0}
              max={0.999999}
              step='any'
              value={played}
              id='music-time-mobile-input'
              readOnly
              ref={(el) => (musicInput.current[1] = el)}
            />
          </div>
        )}
      </div>
      <div className='fixed z-50 lg:hidden top-0 left-0 select-none'>
        {isShowVolumn && (
          <div className='w-screen h-screen bg-black flex flex-col items-center'>
            <ClosePlayerIcon
              width='24'
              height='24'
              className='fill-white absolute top-4 left-4'
              onClick={() => setShowVolumn(false)}
            />
            <ConnectDevice className='text-white w-4/5 mt-20 mb-4' />
            <div className='text-white font-bold text-2xl mb-72'>Connect to a device</div>
            <div className='flex items-center px-4 mb-8 w-full'>
              <div onClick={handleMuted} className='cursor-pointer mr-4'>
                {volumeIcon}
              </div>
              <input
                className='w-full h-1 mx-2 cursor-pointer'
                type='range'
                min={0}
                max={1}
                step='any'
                value={volume}
                id='music-volume-input'
                onChange={(e) => handleSetVolume(e)}
                ref={(el) => (volumeRef.current[1] = el)}
              />
            </div>
          </div>
        )}
        {isShowPlayer && (
          <div className='bg-mobilePlayerBg w-screen h-screen flex flex-col p-6'>
            <div className='flex items-center justify-between'>
              <ClosePlayerIcon width='24' height='24' className='fill-white' onClick={handleShowMobilePlayer} />
              <div className='text-white font-semibold'>Music Player</div>
              <OptionIcons width='24' height='24' className='fill-iconColor' />
            </div>
            <div className='mt-12 flex items-center justify-center'>
              <img
                draggable={false}
                className='h-64 w-64 object-cover shadow-2xl'
                src={musicData.snippet.thumbnails.medium.url}
              />
            </div>
            <div className='flex items-center justify-between mt-8'>
              <div className=''>
                <div className='text-white text-xl font-bold'>{title}</div>
                <div className='text-iconColor font-semibold'>{musicData.snippet.channelTitle}</div>
              </div>
              <LoveButton musicId={musicId} musicData={musicData} width='24' height='24' />
            </div>
            <div className='mt-8 flex flex-col'>
              <input
                className='w-full h-1 mb-1'
                type='range'
                min={0}
                max={0.999999}
                step='any'
                value={played}
                onChange={(e) => handleChange(e)}
                onMouseUp={(e) => handleSeekMouseUp(e)}
                id='music-time-input'
                ref={(el) => (musicInput.current[2] = el)}
              />
              <div className='flex justify-between'>
                <Duration time={parseInt(played * duration)} className='text-navbarColor text-xs font-semibold' />
                <Duration time={duration} className='text-navbarColor text-xs font-semibold' />
              </div>
            </div>
            <div className='flex mt-7 mb-6 justify-between items-center'>
              <div className='' onClick={handleMixMusic}>
                <MixMusic className='fill-white' width='24' height='24' iconRef={mixMusicRef} />
              </div>
              <div className='' onClick={handleBack}>
                {isPlayList ? (
                  <BackMusic className='fill-white' width='24' height='24' />
                ) : (
                  <Back15s className='fill-white' width='24' height='24' />
                )}
              </div>
              <div className='bg-white p-4 w-fit rounded-full' onClick={handlePlayPause}>
                {isPlay ? <PauseIcon width='24' height='24' /> : <PlayIcon width='24' height='24' />}
              </div>
              <div className='' onClick={handleNext}>
                {isPlayList ? (
                  <NextMusic className='fill-white' width='24' height='24' />
                ) : (
                  <Next15s className='fill-white' width='24' height='24' />
                )}
              </div>
              <div className='' onClick={handleLoopMusic}>
                <LoopMusic className='fill-white' width='24' height='24' iconRef={loopIConRef} />
              </div>
            </div>
            <div className='flex justify-between'>
              <ConnectIcon width='16' heigth='16' className='fill-white' onClick={() => setShowVolumn(true)} />
              <ShareIcon width='16' heigth='16' className='fill-white' />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
