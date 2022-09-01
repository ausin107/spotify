import { useRef, useState, useEffect } from 'react'
import { PlayIcon, PauseIcon } from './Icon'
import { useDispatch, useSelector } from 'react-redux/'
import { showMusicPlayer, setPlayPauseMusic, setNotPlayList } from './music_player/musicPlayerSlice'
import { updateCurrentPlInfo } from './extPlaylists/extPlaylistsSlice'
import { useRouter } from 'next/router'
export default function RowItem({ data }) {
  const dispatch = useDispatch()
  const musicState = useSelector((state) => state.player)
  let title = data.snippet.title
    .replace('Official Music Video', '')
    .replace('(', '')
    .replace(')', '')
    .replaceAll('|', '')
  title = title.length > 30 ? title.slice(0, 30) + '...' : title
  const musicId = data.id.videoId || data.id
  const router = useRouter()
  const handleShow = () => {
    if (router.pathname == '/search/playlists') {
      dispatch(updateCurrentPlInfo(data))
      router.push('/search/playlist')
    } else {
      dispatch(setNotPlayList())
      const musicInfo = {
        musicId,
        musicData: data,
      }
      if (musicState.musicId != musicId) {
        dispatch(showMusicPlayer(musicInfo))
      } else if (musicState.musicId == musicId) {
        dispatch(setPlayPauseMusic())
      }
    }
  }
  return (
    <div className='text-white p-4 pb-5 w-full cursor-pointer relative group bg-itemBg hover:bg-itemActiveBg mr-3 rounded h-full'>
      <img
        draggable={false}
        className='rounded mb-4 shadow-2xl w-48 h-44 object-cover'
        src={data.snippet.thumbnails.medium.url}
        alt=''
      />
      <div
        className='group-hover:visible group-hover:translate-y-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 invisible translate-y-2 opacity-0 p-3 d-flex bg-playIconBg absolute rounded-full right-6 bottom-24'
        onClick={handleShow}>
        {musicState.isPlay && musicState.musicId == musicId ? (
          <PauseIcon width='24' height='24' className='fill-black' />
        ) : (
          <PlayIcon width='24' height='24' className='fill-black' />
        )}
      </div>
      <div className='text-white font-semibold'>{title}</div>
    </div>
  )
}
