import { useState, useEffect } from 'react'
import DateConvert from './DateConvert'
import { LoveMusicActive, LoveMusic, PlayIcon } from './Icon'
import { loadMusicData } from '../lib/loadData'
import Duration from './Duration'
export default function PlayListItem({ data, index }) {
  const [duration, setDuration] = useState('')
  const [isHover, setHover] = useState(false)
  const title = data.snippet.title
  const musicName = title
    .replace('Official Music Video', '')
    .replace('(', '')
    .replace(')', '')
    .replace('|', '')
    .slice(0, title.indexOf('|'))
    .trim()
  const channelName = data.snippet.channelTitle.replace('Official', '').trim()
  const date = data.snippet.publishedAt.slice(0, 10)
  useEffect(() => {
    const getDuration = async () => {
      const result = await loadMusicData(data.id)
      const duration = result.items[0].contentDetails.duration
      setDuration(duration)
    }
    getDuration()
  }, [])
  return (
    <div
      className='flex p-2 px-6 items-center hover:bg-itemActiveBg rounded group'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className='text-iconColor font-semibold w-[3%] text-lg'>
        {isHover ? <PlayIcon className='fill-white' width='16' height='16' /> : index + 1}
      </div>
      <div className='flex w-2/5'>
        <img src={data.snippet.thumbnails.medium.url} className=' h-11 rounded shadow-2xl mr-4' />
        <div className=''>
          <div className='text-white'>{musicName}</div>
          <div className='text-iconColor text-sm font-semibold group-hover:text-white'>
            {channelName}
          </div>
        </div>
      </div>
      <div className='w-1/4 text-iconColor font-semibold text-sm group-hover:text-white'>
        {musicName}
      </div>
      <DateConvert className='text-iconColor font-semibold text-sm w-1/5' data={date} />
      <div className='flex justify-end items-center w-[12%]'>
        <LoveMusicActive
          className='fill-playIconBg hover:fill-activeIconHover mr-8'
          width='16'
          height='16'
        />
        <Duration isoTime={duration} className='text-navbarColor font-semibold' />
      </div>
    </div>
  )
}
