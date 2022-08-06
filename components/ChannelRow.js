import { useEffect, useState } from 'react'
import { loadMusicArtist } from '../lib/loadData'
import { PlayIcon } from './Icon'
export default function ChannelRow({ artistData }) {
  const [artist, setArtist] = useState('')
  useEffect(() => {
    let artistsId = artistData.map((item) => {
      return item.snippet.channelId
    })
    const getAllArtist = async () => {
      let data = await Promise.all(
        await artistsId.map(async (item) => {
          const res = await loadMusicArtist(item)
          return res.items[0]
        })
      )
      //   data = data.filter((item, index) => data.indexOf(item) === index)
      console.log(data)
      setArtist(data)
    }
    getAllArtist()
  }, [artistData])
  return (
    <div className='px-8 mb-8'>
      <div className='text-white text-2xl mb-7 font-bold'>Artists</div>
      <div className='flex'>
        {!!artist &&
          artist.map((item, index) => {
            return (
              <div
                key={index}
                className='mr-4 group bg-itemBg hover:bg-itemActiveBg rounded px-5 py-5 relative transition-all duration-300'>
                <img
                  className='rounded-full w-44 mb-4 shadow-2xl'
                  src={item.snippet.thumbnails.medium.url}
                />
                <div className='text-white font-bold mb-1'>
                  {item.snippet.title.replace('Official', '').trim()}
                </div>
                <div className='text-iconColor text-sm font-bold mb-4'>Artist</div>
                <div className='group-hover:visible group-hover:translate-y-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 invisible translate-y-5 opacity-0 p-3 d-flex bg-playIconBg absolute rounded-full right-6 bottom-6 cursor-pointer'>
                  <PlayIcon width='24' height='24' className='fill-black' />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
