import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PauseIcon, PlayIcon } from './Icon'
import { setNotPlayList, setPlayPauseMusic, showMusicPlayer } from './music_player/musicPlayerSlice'
import { addCollection, getCollection } from './collection/collectionAction'
import { setShow } from './toast/toastSlice'
export default function PlaylistSearchItem({ data }) {
  const dispatch = useDispatch()
  const isPlay = useSelector((state) => state.player.isPlay)
  const musicId = useSelector((state) => state.player.musicId)
  const isShow = useSelector((state) => state.player.isShow)
  const authKey = useSelector((state) => state.auth.authKey)
  const isAuth = useSelector((state) => state.auth.isAuth)
  const currentPLId = useSelector((state) => state.collection.currentPlaylist)
  const title = data.snippet.title
  let musicName = title.replace('Official Music Video', '').replace('(', '').replace(')', '').replaceAll('|', '')
  musicName = musicName.length >= 50 ? musicName.slice(0, 50) + '...' : musicName
  let albumName = musicName.length >= 30 ? musicName.slice(0, 30) + '...' : musicName
  const channelName = data.snippet.channelTitle.replace('Official', '').trim()
  const itemId = data.id.videoId
  const handlePlayPause = (e) => {
    dispatch(setNotPlayList())
    e.stopPropagation()
    const musicInfo = {
      musicData: data,
      musicId: itemId,
    }
    if (musicId != itemId) {
      dispatch(showMusicPlayer(musicInfo))
    } else if (musicId == itemId) {
      dispatch(setPlayPauseMusic())
    }
  }
  const handleAddMusic = async (e) => {
    e.stopPropagation()
    if (isAuth) {
      dispatch(addCollection(`collection/${authKey}/playlists/${currentPLId}/items/${itemId}`, data))
      dispatch(getCollection(`collection/${authKey}/playlists/${currentPLId}/items`))
      dispatch(setShow('Added to your Playlist'))
    } else {
      dispatch(setShow('Please Login First !!'))
    }
  }
  return (
    <div className='flex p-2 px-6 items-center hover:bg-itemActiveBg focus:bg-itemActiveBg rounded group' tabIndex={0}>
      <div className='w-[3%] group-hover:visible group-focus:visible invisible ' onClick={(e) => handlePlayPause(e)}>
        {isPlay && musicId == itemId ? (
          <PauseIcon className='fill-white cursor-pointer' width='16' height='16' />
        ) : (
          <PlayIcon className='fill-white cursor-pointer' width='16' height='16' />
        )}
      </div>
      <div className='flex w-3/5'>
        <img src={data.snippet.thumbnails.medium.url} className=' h-11 shadow-2xl mr-4' />
        <div className=''>
          <div className='font-semibold'>
            {musicId == itemId ? (
              <div className='text-playIconBg'>{musicName}</div>
            ) : (
              <div className='text-white'>{musicName}</div>
            )}
          </div>
          <div className='text-iconColor text-sm font-semibold group-hover:text-white group-focus:text-white hover:underline cursor-pointer'>
            {channelName}
          </div>
        </div>
      </div>
      <div className='w-[22%] text-iconColor text-sm font-semibold group-hover:text-white group-focus:text-white hover:underline cursor-pointer underline-offset-1'>
        {albumName}
      </div>
      <div className='w-[15%] flex justify-end' onClick={handleAddMusic}>
        <div className='border border-iconColor rounded-full py-1 px-4 w-fit text-white text-sm font-semibold hover:border-white cursor-pointer'>
          Add
        </div>
      </div>
    </div>
  )
}
