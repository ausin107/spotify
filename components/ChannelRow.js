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
      let jsonObj = data.map(JSON.stringify)
      let uniqueSet = new Set(jsonObj)
      let uniqueArray = Array.from(uniqueSet).map(JSON.parse)
      setArtist(uniqueArray)
    }
    getAllArtist()
  }, [artistData])
  return (
    <div className='px-8 mb-8'>
      <div className='text-white text-2xl mb-7 font-bold'>Artists</div>
      <div className='flex'>
        {!!artist &&
          artist.map((item, index) => {
            if (index < 6) {
              return (
                <div
                  key={index}
                  className='mr-4 w-full group bg-itemBg hover:bg-itemActiveBg rounded px-5 py-5 relative transition-all duration-300'>
                  <img className='rounded-full mb-4 shadow-2xl' src={item.snippet.thumbnails.medium.url} alt='' />
                  <div className='text-white font-bold mb-1'>{item.snippet.title.replace('Official', '').trim()}</div>
                  <div className='text-iconColor text-sm font-bold mb-4'>Artist</div>
                </div>
              )
            }
          })}
      </div>
    </div>
  )
}
