import React from 'react'
import { useSelector } from 'react-redux'

export default function Artists() {
  const artistData = useSelector((state) => state.search.articsData)
  return (
    <div className='grid grid-cols-5 gap-6 pb-40 pt-32 px-8'>
      {artistData.map((item, index) => {
        return (
          <div
            key={index}
            className='mr-4 w-full group bg-itemBg hover:bg-itemActiveBg rounded px-5 py-5 relative transition-all duration-300'>
            <img className='rounded-full mb-4 shadow-2xl' src={item.snippet.thumbnails.medium.url} alt='' />
            <div className='text-white font-bold mb-1'>{item.snippet.title.replace('Official', '').trim()}</div>
            <div className='text-iconColor text-sm font-bold mb-4'>Artist</div>
          </div>
        )
      })}
    </div>
  )
}
