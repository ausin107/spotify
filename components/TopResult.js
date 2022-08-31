import React from 'react'
import SearchMusicItem from './SearchMusicItem'
import { PlayIcon, PauseIcon } from './Icon'
import { setPlayPauseMusic, showMusicPlayer, setNotPlayList } from './music_player/musicPlayerSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function TopResult({ musicData }) {
  const dispatch = useDispatch()
  const isPlay = useSelector((state) => state.player.isPlay)
  const musicId = useSelector((state) => state.player.musicId)
  let musicName = musicData[0].snippet.title
    .replace('Official Music Video', '')
    .replace('(', '')
    .replace(')', '')
    .replaceAll('|', '')
  musicName = musicName.length >= 25 ? musicName.slice(0, 30) + '...' : musicName
  const handleShow = () => {
    dispatch(setNotPlayList())
    const musicInfo = {
      musicData: musicData[0],
      musicId: musicData[0].id.videoId,
    }
    if (musicId != musicData[0].id.videoId) {
      dispatch(showMusicPlayer(musicInfo))
    }
  }
  const handlePlay = (e) => {
    dispatch(setNotPlayList())
    e.stopPropagation()
    const musicInfo = {
      musicData: musicData[0],
      musicId: musicData[0].id.videoId,
    }
    if (musicId != musicData[0].id.videoId) {
      dispatch(showMusicPlayer(musicInfo))
    } else if (musicId == musicData[0].id.videoId) {
      dispatch(setPlayPauseMusic())
    }
  }
  return (
    <div className='flex pt-28 relative px-8 w-screen mb-10'>
      <div className='w-[30%]' onClick={handleShow}>
        <div className='text-2xl font-bold text-white mb-7'>Top Result</div>
        <div className='group bg-itemBg hover:bg-itemActiveBg rounded pl-5 py-5 relative transition-all duration-300'>
          <img className='rounded w-48 mb-8 shadow-2xl' src={musicData[0].snippet.thumbnails.medium.url} alt='' />
          <div className='font-bold text-2xl text-white mb-4'>{musicName}</div>
          <div className='flex items-center'>
            <div className='text-iconColor text-sm font-bold mr-3'>
              {musicData[0].snippet.channelTitle.replace('Official', '').trim()}
            </div>
            <div className='px-3 bg-black text-white uppercase text-sm font-bold rounded-full py-1'>Music</div>
          </div>
          <div
            className='group-hover:visible group-hover:translate-y-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 invisible translate-y-5 opacity-0 p-3 d-flex bg-playIconBg absolute rounded-full right-6 bottom-4 cursor-pointer'
            onClick={handlePlay}>
            {isPlay && musicId == musicData[0].id.videoId ? (
              <PauseIcon width='24' height='24' className='fill-black' />
            ) : (
              <PlayIcon width='24' height='24' className='fill-black' />
            )}
          </div>
        </div>
      </div>
      <div className='w-[52%] pl-8'>
        <div className='text-2xl font-bold text-white mb-7'>Music</div>
        <div className='flex flex-col'>
          {musicData.map((item, index) => {
            if (index < 4) {
              return <SearchMusicItem musicData={item} key={index} />
            }
          })}
        </div>
      </div>
    </div>
  )
}
