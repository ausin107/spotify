import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { getAllLikedMusic } from '../lib/firebaseAction'
import { loadItemsSuccess } from '../components/collection/collectionSlice'
import {
  setPlayList,
  showMusicPlayer,
  setEnded,
  setCurrentId,
} from '../components/music_player/musicPlayerSlice'
import { ClockIcon, PlayIcon } from '../components/Icon'
import PlayListItem from '../components/PlayListItem'
export default function Collection() {
  const [data, setData] = useState('')
  const dispatch = useDispatch()
  const authKey = useSelector((state) => state.auth.authKey)
  const likedMusic = useSelector((state) => state.collection?.items)
  const isEnded = useSelector((state) => state.player.isEnded)
  const currentId = useSelector((state) => state.collection.currentId)
  useEffect(() => {
    const getData = async () => {
      const result = await getAllLikedMusic(`collection/${authKey}/items`)
      let data = []
      result.forEach((doc) => {
        return data.push(doc.data())
      })
      dispatch(loadItemsSuccess(data))
      setData(data)
    }
    getData()
  }, [])
  useEffect(() => {
    likedMusic.map((item, index) => {
      if (index == currentId) {
        const musicInfo = {
          musicData: item,
          musicId: item.id,
        }
        dispatch(showMusicPlayer(musicInfo))
      }
    })
    dispatch(setEnded())
  }, [currentId])
  const handlePlay = () => {
    dispatch(setPlayList())
    likedMusic.map((item, index) => {
      if (index == 0) {
        const musicInfo = {
          musicData: item,
          musicId: item.id,
        }
        dispatch(showMusicPlayer(musicInfo))
      }
    })
  }
  return (
    <div className='bg-bgColor left-[16.666%] w-[82.5vw] overflow-hidden relative'>
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
          <div
            onClick={handlePlay}
            className='p-4 bg-playIconBg hover:bg-activeIconHover rounded-full hover:scale-105 mb-8 w-fit'>
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
              return <PlayListItem key={index} data={item} index={index} />
            })}
          </div>
        </div>
      )}
    </div>
  )
}
