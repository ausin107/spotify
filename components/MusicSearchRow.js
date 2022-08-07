import React from 'react'
import RowItem from './RowItem'
export default function MusicSearchRow({ musicData }) {
  return (
    <div className='mb-20 px-8'>
      <div className='text-white font-bold text-2xl mb-8'>All Music</div>
      <div className='grid grid-cols-4 gap-4'>
        {musicData.map((item, index) => {
          return <RowItem key={index} data={item} />
        })}
      </div>
    </div>
  )
}
