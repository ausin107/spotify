import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LazyImage from '../../components/LazyImage'
export default function Artists() {
  const [artists, setArtists] = useState()
  const artistData = useSelector((state) => state.search.articsData)
  useEffect(() => {
    setArtists(artistData)
  }, [artistData])
  return (
    <div className='sm:grid lg:grid-cols-5 sm:grid-cols-3 sm:gap-6 pb-40 sm:pt-32 pt-28 lg:px-8 sm:px-4'>
      {artists?.map((item, index) => {
        return (
          <div
            key={index}
            className='w-full group sm:bg-itemBg sm:hover:bg-itemActiveBg flex sm:block rounded sm:px-5 sm:py-5 px-4 relative transition-all duration-300'>
            <LazyImage
              className='rounded-full mb-4 shadow-2xl w-14 h-14 sm:w-fit sm:h-fit'
              lazySrc={item.snippet.thumbnails.medium.url}
              alt=''
            />
            <div className='flex sm:block flex-col ml-3 sm:ml-0'>
              <div className='text-white font-semibold mb-1'>{item.snippet.title.replace('Official', '').trim()}</div>
              <div className='text-iconColor text-sm font-semibold mb-4'>Artist</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
