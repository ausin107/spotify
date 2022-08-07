import { useRef, useState, useEffect } from 'react'
import { PlayIcon } from './Icon'
import { useDispatch } from 'react-redux/'
import { showMusicPlayer } from './music_player/musicPlayerSlice'
export default function RowItem({ data }) {
  const dispatch = useDispatch()
  const title =
    data.snippet.title.length > 60 ? data.snippet.title.slice(0, 60) + '...' : data.snippet.title
  const musicId = data.id
  const handleShow = () => {
    const musicInfo = {
      musicId,
      musicData: data,
    }
    dispatch(showMusicPlayer(musicInfo))
  }
  return (
    <div className='text-white p-4 w-full cursor-pointer relative group bg-itemBg hover:bg-itemActiveBg mr-3 rounded h-full select-none'>
      <img
        draggable={false}
        className='rounded mb-4 shadow-2xl'
        src={data.snippet.thumbnails.medium.url}
      />
      <div
        className='group-hover:visible group-hover:translate-y-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 invisible translate-y-5 opacity-0 p-3 d-flex bg-playIconBg absolute rounded-full right-6 bottom-[5.5rem]'
        onClick={handleShow}>
        <PlayIcon width='24' height='24' className='fill-black' />
      </div>
      <div>{title}</div>
    </div>
  )
}
