import { ClockIcon, LoveIcon, PlayIcon } from '../components/Icon'
import Image from 'next/image'
import { getAllLikedMusic } from '../lib/firebaseAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Collection() {
  const [data, setData] = useState('')
  const dispatch = useDispatch()
  const authKey = useSelector((state) => state.auth.authKey)
  const likedMusic = useSelector((state) => state.collection.items)
  useEffect(() => {
    const getData = async () => {
      const result = await getAllLikedMusic(`collection/${authKey}/items`)
      let data = []
      result.forEach((doc) => {
        return data.push(doc.data())
      })
      setData(data)
    }
    getData()
  }, [])
  return (
    <div className='bg-bgColor left-[16.666%] w-[82.5vw] overflow-hidden h-full relative'>
      <div className='pt-20 pb-48 px-9 flex bg-likedBg items-end'>
        <div className='w-60 h-60 shadow-3xl'>
          <Image src='/loveImg.png' width='240' height='240' className='' />
        </div>
        <div className='px-6'>
          <div
            className='uppercase text-white font-bold text-xs mb-2'
            style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            Playlist
          </div>
          <div
            className='text-white font-bold text-8xl mb-12'
            style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            Liked Song
          </div>
          <div
            className='text-white text-xs font-bold'
            style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            Ausin - 2 Bài hát
          </div>
        </div>
      </div>
      {data && (
        <div className='flex px-9 relative -top-40 py-4 bg-resultBg flex-col '>
          <div className='p-4 bg-playIconBg hover:bg-activeIconHover rounded-full hover:scale-105 mb-8 w-fit'>
            <PlayIcon className='fill-black' width='24' height='24' />
          </div>
          <div className='flex px-6 pb-2'>
            <div className='text-iconColor text-sm w-[3%]'>#</div>
            <div className='text-iconColor text-sm w-2/5'>NAME</div>
            <div className='text-iconColor text-sm w-1/4'>ALBUM</div>
            <div className='text-iconColor text-sm w-1/5'>DATE</div>
            <div className='text-iconColor text-sm w-[12%] flex justify-end'>
              <ClockIcon width='16' height='16' className='fill-iconColor hover:fill-white' />
            </div>
          </div>
          <div className='border-b border-t border-searchChildBg flex flex-col pt-4 pb-20 mb-20'>
            {data.map((item, index) => {
              const title = item.snippet.title
              const musicName = title
                .replace('Official Music Video', '')
                .replace('(', '')
                .replace(')', '')
                .slice(0, title.indexOf('|'))
                .trim()
              const channelName = item.snippet.channelTitle.replace('Official', '').trim()
              const date = item.snippet.publishedAt.slice(0, 10)
              return (
                <div className='flex p-2 px-6 items-center hover:bg-itemActiveBg rounded'>
                  <div className='text-iconColor font-semibold w-[3%]'>{index + 1}</div>
                  <div className='flex w-2/5'>
                    <img
                      src={item.snippet.thumbnails.medium.url}
                      className=' h-11 rounded shadow-2xl mr-4'
                    />
                    <div className=''>
                      <div className='text-white'>{musicName}</div>
                      <div className='text-iconColor text-sm font-semibold'>{channelName}</div>
                    </div>
                  </div>
                  <div className='w-1/4 text-iconColor font-semibold text-sm'>{musicName}</div>
                  <div className='text-iconColor font-semibold text-sm w-1/5'>{date}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
