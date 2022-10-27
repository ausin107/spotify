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
  SpinIcon,
} from './Icon'
import LoveButton from './LoveButton'
import Duration from './Duration'
import { setPlayPauseMusic, showMusicPlayer } from './music_player/musicPlayerSlice'
import { useSelector, useDispatch } from 'react-redux'
import { increaseCurrentId, decreaseCurrentId, loadItemsSuccess, setOriginItems } from './collection/collectionSlice'
import SekeletonPlayer from './SekeletonPlayer'
import { useRouter } from 'next/router'
export default function MusicPlayer() {
  const [player, setPlayer] = useState({
    loop: false,
    mix: false,
    name: '',
    played: 0,
    loadedSeconds: 0,
    duration: 0,
    isShowVolumn: false,
    volumeIcon: <VolumeIconMedium className='fill-musicPlayer hover:fill-white' width='16' height='16' />,
  })
  const [volume, setVolume] = useState(0.5)
  const musicInput = useRef([])
  const volumeRef = useRef([])
  const mixMusicRef = useRef([])
  const loopIConRef = useRef([])
  const playerRef = useRef()
  const queueRef = useRef()
  const mobilePlayerRef = useRef()
  const dispatch = useDispatch()
  const router = useRouter()
  const { isShow, musicData, musicId, isPlay, isPlayList } = useSelector((state) => state.player)
  const { items, currentId, originItems } = useSelector((state) => state.collection)
  const handleReady = () => {
    setPlayer({ ...player, duration: playerRef.current.getDuration() })
  }
  const handleMusicUrl = () => {
    return 'https://www.youtube.com/watch?v=' + musicId
  }
  const handlePlayPause = (e) => {
    e.stopPropagation()
    if (player.loadedSeconds >= 1 && player.played > 0) {
      dispatch(setPlayPauseMusic())
    }
  }
  const handleLoopMusic = () => {
    if (player.loop) {
      setPlayer({ ...player, loop: false })
      loopIConRef.current.map((item) => {
        item.classList.remove('fill-activeIcon', 'hover:fill-activeIconHover')
        item.classList.add('fill-musicPlayer', 'hover:fill-white')
      })
    } else {
      setPlayer({ ...player, loop: true })
      loopIConRef.current.map((item) => {
        item.classList.remove('fill-musicPlayer', 'hover:fill-white')
        item.classList.add('fill-activeIcon', 'hover:fill-activeIconHover')
      })
    }
  }
  const handleProgress = (state) => {
    musicInput.current.map((item) => {
      if (!!item) {
        item.style.backgroundSize = (state.playedSeconds / player.duration) * 100 + '%'
      }
    })
    setPlayer({ ...player, played: state.played, loadedSeconds: state.loadedSeconds })
  }
  const handleChange = (e) => {
    setPlayer({ ...player, played: e.target.value })
    musicInput.current.map((item) => {
      if (!!item) {
        item.style.backgroundSize = e.target.value * 100 + '%'
      }
    })
    playerRef.current.seekTo(e.target.value, 'fraction')
  }
  const handleSetVolume = (e) => {
    setVolume(parseFloat(e.target.value))
    volumeRef.current.map((item) => {
      if (!!item) {
        item.style.backgroundSize = e.target.value * 100 + '%'
      }
    })
    if (e.target.value > 0 && e.target.value < 0.3) {
      setPlayer({
        ...player,
        volumeIcon: <VolumeIconLow className='fill-musicPlayer hover:fill-white' width='16' height='16' />,
      })
    } else if (e.target.value >= 0.3 && e.target.value < 0.6) {
      setPlayer({
        ...player,
        volumeIcon: <VolumeIconMedium className='fill-musicPlayer hover:fill-white' width='16' height='16' />,
      })
    } else if (e.target.value >= 0.6) {
      setPlayer({
        ...player,
        volumeIcon: <VolumeIconHigh className='fill-musicPlayer hover:fill-white' width='16' height='16' />,
      })
    } else {
      setPlayer({
        ...player,
        volumeIcon: <VolumeIconMuted className='fill-musicPlayer hover:fill-white' width='16' height='16' />,
      })
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
      setPlayer({
        ...player,
        volumeIcon: <VolumeIconMuted className='fill-musicPlayer hover:fill-white' width='16' height='16' />,
      })
    } else {
      volumeRef.current.map((item) => {
        if (!!item) {
          item.style.backgroundSize = '50%'
        }
      })
      setVolume(0.5)
      setPlayer({
        ...player,
        volumeIcon: <VolumeIconMedium className='fill-musicPlayer hover:fill-white' width='16' height='16' />,
      })
    }
  }
  const handleBack = () => {
    if (isPlayList) {
      dispatch(decreaseCurrentId())
    } else {
      const playedTime = (playerRef.current.getCurrentTime() - 15) / player.duration
      playerRef.current.seekTo(playedTime, 'fraction')
    }
  }
  const handleNext = () => {
    if (isPlayList) {
      dispatch(increaseCurrentId())
    } else {
      const playedTime = (playerRef.current.getCurrentTime() + 15) / player.duration
      playerRef.current.seekTo(playedTime, 'fraction')
    }
  }
  const handleEnded = () => {
    if (isPlayList) {
      dispatch(increaseCurrentId())
    }
  }
  const handleMixMusic = async () => {
    if (isPlayList) {
      if (player.mix) {
        setPlayer({ ...player, mix: false })
        mixMusicRef.current.map((item) => {
          item.classList.remove('fill-activeIcon', 'hover:fill-activeIconHover')
          item.classList.add('fill-musicPlayer', 'hover:fill-white')
        })
        let currentIndex = originItems.findIndex((item, index) => {
          if (item.etag == musicData.etag) {
            return index
          }
        })
        let musics = originItems.filter((item, index) => {
          if (index >= currentIndex) {
            return item
          }
        })
        dispatch(loadItemsSuccess({ data: musics, index: 0 }))
      } else {
        dispatch(setOriginItems(items))
        let mixMusic = [...items]
        mixMusic.sort(function () {
          return 0.5 - Math.random()
        })
        let result = mixMusic.filter((item) => item.etag != musicData.etag)
        setPlayer({ ...player, mix: true })
        dispatch(loadItemsSuccess({ data: [musicData, ...result], index: 0 }))
        mixMusicRef.current.map((item) => {
          item.classList.remove('fill-musicPlayer', 'hover:fill-white')
          item.classList.add('fill-activeIcon', 'hover:fill-activeIconHover')
        })
      }
    }
  }
  const handleShowMobilePlayer = (e) => {
    e.stopPropagation()
    mobilePlayerRef.current?.classList.toggle('hiddenMobilePlayer')
  }
  const handleQueue = () => {
    if (router.pathname == '/queue') {
      window.history.back()
    } else {
      router.push('/queue')
    }
  }
  useEffect(() => {
    if (isPlayList) {
      !!items &&
        items.map((item, index) => {
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
  }, [currentId, items])
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
  useEffect(() => {
    let title = musicData?.snippet.title
    title = title?.replace(/official|music|video/gi, '')
    setPlayer({ ...player, name: title })
  }, [musicData])
  useEffect(() => {
    volumeRef.current.map((item) => {
      if (!!item) {
        item.style.backgroundSize = volume * 100 + '%'
      }
    })
  }, [player.isShowVolumn])
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
              loop={player.loop}
              volume={volume}
            />
            <div className='flex flex-row justify-between h-full items-center'>
              <div className='flex items-center w-[30%]'>
                <img
                  draggable={false}
                  className='h-16 w-16 object-cover mr-4'
                  src={musicData.snippet.thumbnails.medium.url}
                />
                <div>
                  <div className='text-white text-sm font-semibold mb-2 w-60 h-10 overflow-hidden'>{player.name}</div>
                  <div className='text-iconColor text-sm'>
                    {musicData.snippet.videoOwnerChannelTitle || musicData.snippet.channelTitle}
                  </div>
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
                      iconRef={(el) => (mixMusicRef.current[0] = el)}
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
                      iconRef={(el) => (loopIConRef.current[0] = el)}
                    />
                  </div>
                </div>
                <div className='flex items-center'>
                  <Duration time={parseInt(player.played * player.duration)} className='text-navbarColor text-xs' />
                  <input
                    className='w-[32rem] h-1 mx-2 cursor-pointer'
                    type='range'
                    min={0}
                    max={0.999999}
                    step='any'
                    value={player.played}
                    onChange={(e) => handleChange(e)}
                    id='music-time-input'
                    ref={(el) => (musicInput.current[0] = el)}
                  />
                  <Duration time={player.duration} className='text-navbarColor text-xs' />
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
                    {player.volumeIcon}
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
            className='bg-itemBg h-14 sm:w-[98%] w-[96%] mx-2 flex flex-col justify-end items-center rounded px-2'
            onClick={(e) => handleShowMobilePlayer(e)}>
            <div className='flex w-full mb-2 justify-between'>
              <div className='flex items-center'>
                <img
                  draggable={false}
                  className='h-10 w-10 rounded object-cover mr-4'
                  src={musicData.snippet.thumbnails.medium.url}
                />
                <div>
                  <div className='text-white text-sm font-semibold sm:w-[35rem] w-64 overflow-hidden text-ellipsis whitespace-nowrap'>
                    {player.name}
                  </div>
                  <div className='text-iconColor text-sm  sm:w-[35rem] w-64 overflow-hidden text-ellipsis whitespace-nowrap'>
                    {musicData?.snippet.videoOwnerChannelTitle || musicData?.snippet.channelTitle}
                  </div>
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
              value={player.played}
              id='music-time-mobile-input'
              readOnly
              ref={(el) => (musicInput.current[1] = el)}
            />
          </div>
        )}
      </div>
      <div className='fixed z-50 lg:hidden top-0 left-0 select-none'>
        {player.isShowVolumn && (
          <div className='w-screen h-screen bg-black flex flex-col items-center'>
            <ClosePlayerIcon
              width='24'
              height='24'
              className='fill-white absolute top-4 left-4'
              onClick={() => setPlayer({ ...player, isShowVolumn: false })}
            />
            <ConnectDevice className='text-white w-4/5 mt-20 mb-4' />
            <div className='text-white font-bold text-2xl mb-72'>Connect to a device</div>
            <div className='flex items-center px-4 mb-8 w-full'>
              <div onClick={handleMuted} className='cursor-pointer mr-4'>
                {player.volumeIcon}
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
        <div
          className='bg-mobilePlayerBg w-screen h-screen flex flex-col p-6 transition-all duration-300 opacity-100 hiddenMobilePlayer'
          ref={mobilePlayerRef}>
          <div className='flex items-center justify-between'>
            <ClosePlayerIcon width='24' height='24' className='fill-white' onClick={handleShowMobilePlayer} />
            <div className='text-white font-semibold'>Music Player</div>
            <OptionIcons width='24' height='24' className='fill-iconColor' />
          </div>
          <div className='mt-12 flex items-center justify-center'>
            <img
              ref={mobileImage}
              draggable={false}
              className='sm:h-64 sm:w-64 w-64 h-64 object-cover shadow-2xl'
              src={musicData?.snippet.thumbnails.maxres.url || musicData?.snippet.thumbnails.high.url}
            />
          </div>
          <div className='flex items-center justify-between sm:mt-8 mt-4'>
            <div className='w-[85%]'>
              <div className='text-white text-xl font-bold h-14 overflow-hidden'>{player.name}</div>
              <div className='text-iconColor font-semibold'>
                {musicData?.snippet.videoOwnerChannelTitle || musicData?.snippet.channelTitle}
              </div>
            </div>
            <LoveButton
              className='w-1/5 flex justify-end'
              musicId={musicId}
              musicData={musicData}
              width='24'
              height='24'
            />
          </div>
          <div className='mt-8 flex flex-col'>
            <input
              className='w-full h-1 mb-1'
              type='range'
              min={0}
              max={0.999999}
              step='any'
              value={player.played}
              onChange={(e) => handleChange(e)}
              id='music-time-input'
              ref={(el) => (musicInput.current[2] = el)}
            />
            <div className='flex justify-between'>
              <Duration
                time={parseInt(player.played * player.duration)}
                className='text-navbarColor text-xs font-semibold'
              />
              <Duration time={player.duration} className='text-navbarColor text-xs font-semibold' />
            </div>
          </div>
          <div className='flex mt-7 mb-6 justify-between items-center'>
            <div className='' onClick={handleMixMusic}>
              <MixMusic className='fill-white' width='24' height='24' iconRef={(el) => (mixMusicRef.current[1] = el)} />
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
              <LoopMusic
                className='fill-white'
                width='24'
                height='24'
                iconRef={(el) => (loopIConRef.current[1] = el)}
              />
            </div>
          </div>
          <div className='flex justify-between'>
            <ConnectIcon
              width='16'
              heigth='16'
              className='fill-white'
              onClick={() => setPlayer({ ...player, isShowVolumn: true })}
            />
            <ShareIcon width='16' heigth='16' className='fill-white' />
          </div>
        </div>
      </div>
    </>
  )
}
