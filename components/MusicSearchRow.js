import React from 'react'
import RowItem from './RowItem'
export default function MusicSearchRow({ musicData, title }) {
  return (
    <div className='mb-20 px-8'>
      {!!title && <div className='text-white font-bold text-2xl mb-8'>{title}</div>}
      <div className='grid grid-cols-5 gap-4'>
        {musicData.map((item, index) => {
          return <RowItem key={index} data={item} />
        })}
      </div>
    </div>
  )
}
