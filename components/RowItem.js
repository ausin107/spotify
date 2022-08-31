import { useRef, useState, useEffect } from 'react'
import { PlayIcon, PauseIcon } from './Icon'
import { useDispatch, useSelector } from 'react-redux/'
import { showMusicPlayer, setPlayPauseMusic, setNotPlayList } from './music_player/musicPlayerSlice'
import { updateCollectionInfo } from './collection/collectionSlice'
import { updateCurrentPlInfo } from './extPlaylists/extPlaylistsSlice'
import { useRouter } from 'next/router'
export default function RowItem({ data }) {
  const dispatch = useDispatch()
  const musicState = useSelector((state) => state.player)
  const title = data.snippet.title.length > 60 ? data.snippet.title.slice(0, 60) + '...' : data.snippet.title
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
    <div className='text-white p-4 w-full cursor-pointer relative group bg-itemBg hover:bg-itemActiveBg mr-3 rounded h-full select-none'>
      <img draggable={false} className='rounded mb-4 shadow-2xl' src={data.snippet.thumbnails.medium.url} alt='' />
      <div
        className='group-hover:visible group-hover:translate-y-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 invisible translate-y-5 opacity-0 p-3 d-flex bg-playIconBg absolute rounded-full right-6 bottom-[5.5rem]'
        onClick={handleShow}>
        {musicState.isPlay && musicState.musicId == musicId ? (
          <PauseIcon width='24' height='24' className='fill-black' />
        ) : (
          <PlayIcon width='24' height='24' className='fill-black' />
        )}
      </div>
      <div>{title}</div>
    </div>
  )
}
