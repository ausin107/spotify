import { useRef, useState, useEffect } from 'react'
import { PlayIcon } from './Icon'
import MusicPlayer from './MusicPlayer'
export default function RowItem({ data }) {
  const [isShow, setShow] = useState(false)
  const title =
    data.snippet.title.length > 60 ? data.snippet.title.slice(0, 60) + '...' : data.snippet.title
  const musicUrl = 'https://www.youtube.com/watch?v=' + data.id
  const handleShow = () => {
    setShow(true)
  }
  return (
    <div className='text-white p-4 cursor-pointer relative group bg-itemBg hover:bg-itemActiveBg mr-3 rounded h-full'>
      <img draggable={false} className='rounded mb-4' src={data.snippet.thumbnails.medium.url} />
      <div
        className='group-hover:visible group-hover:translate-y-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 invisible translate-y-5 opacity-0 p-3 d-flex bg-playIconBg absolute rounded-full right-6 bottom-[5.5rem]'
        onClick={handleShow}>
        <PlayIcon width='24' height='24' className='fill-black' />
      </div>
      <div>{title}</div>
      <MusicPlayer isShow={isShow} musicUrl={musicUrl} musicData={data} />
    </div>
  )
}
