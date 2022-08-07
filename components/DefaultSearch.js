import React from 'react'
import { allSearchPageData } from './allSearchPageData'
export default function DefaultSearch() {
  return (
    <div className=' px-8 pt-24'>
      <div className='text-2xl font-bold text-white mb-8'>Browse all</div>
      <div className='grid grid-cols-6 gap-6'>
        {allSearchPageData.map((item) => {
          return (
            <div
              className='overflow-hidden w-44 h-44 rounded p-4 cursor-pointer relative'
              style={{ backgroundColor: `${item.bgColor}` }}>
              <div className='text-white font-bold text-2xl'>{item.title}</div>
              <img
                src={item.imgUrl}
                className='absolute bottom-[-5%] right-[-10%] w-24 h-24 rotate-[25deg]'
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
