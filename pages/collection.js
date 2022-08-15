import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { getAllFavoriteMusic } from '../lib/firebaseAction'
import Link from 'next/link'
import { getCollection } from '../components/collection/collectionAction'
import { setPlayList, showMusicPlayer, setEnded, setPlayPauseMusic } from '../components/music_player/musicPlayerSlice'
import { ClockIcon, PlayIcon, PauseIcon, MusicIcon } from '../components/Icon'
import PlayListItem from '../components/PlayListItem'
export default function Collection() {
  const [data, setData] = useState('')
  const dispatch = useDispatch()
  const authKey = useSelector((state) => state.auth.authKey)
  const isPlay = useSelector((state) => state.player.isPlay)
  const isPlayList = useSelector((state) => state.player.isPlayList)
  const isShow = useSelector((state) => state.player.isShow)
  const isEnded = useSelector((state) => state.player.isEnded)
  const currentId = useSelector((state) => state.collection.currentId)
  const isLoading = useSelector((state) => state.collection.isLoading)
  const allMusic = useSelector((state) => state.collection.items)
  useEffect(() => {
    const getData = async () => {
      const result = await getAllFavoriteMusic(`collection/${authKey}/items`)
      setData(result)
    }
    getData()
    document.title = 'Spotify - Favorite'
  }, [allMusic])
  useEffect(() => {
    if (isPlayList) {
      !!data &&
        data.map((item, index) => {
          if (index == currentId) {
            let musicId = typeof item.id == 'object' ? item.id.videoId : item.id
            const musicInfo = {
              musicData: item,
              musicId,
            }
            dispatch(showMusicPlayer(musicInfo))
            document.title = item.snippet.title
          }
        })
      dispatch(setEnded())
    }
  }, [currentId])
  const handlePlay = () => {
    if (!isPlayList) {
      dispatch(setPlayList())
      data.map((item, index) => {
        if (index == 0) {
          let musicId = typeof item.id == 'object' ? item.id.videoId : item.id
          const musicInfo = {
            musicData: item,
            musicId,
          }
          dispatch(getCollection(`collection/${authKey}/items`))
          dispatch(showMusicPlayer(musicInfo))
        }
      })
    } else if (isPlayList) {
      dispatch(setPlayPauseMusic())
    }
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
          <div className='text-white font-bold text-8xl mb-12' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            Favorite Song
          </div>
          <div className='text-white text-xs font-bold' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            User - {data.length} song
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        <div className='flex px-9 -top-40 relative pt-4 bg-resultBg flex-col '>
          <div
            onClick={handlePlay}
            className='p-4 bg-playIconBg hover:bg-activeIconHover rounded-full hover:scale-105 mb-8 w-fit cursor-pointer'>
            {isPlay && isPlayList ? (
              <PauseIcon className='fill-black' width='24' height='24' />
            ) : (
              <PlayIcon className='fill-black' width='24' height='24' />
            )}
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
          <div className='border-b border-t border-searchChildBg flex flex-col pt-4 pb-4'>
            {data.map((item, index) => {
              return <PlayListItem key={index} data={item} index={index} />
            })}
          </div>
        </div>
      ) : (
        <div className='flex px-9 -top-40 relative pt-14 bg-resultBg flex-col items-center'>
          <MusicIcon width='64' height='64' className='fill-white mb-10' />
          <div className='text-3xl font-bold text-white mb-8'>Your favorite song will appear here</div>
          <div className='font-bold text-white mb-12'>Save the song by tapping the heart icon.</div>
          <Link href='/search'>
            <div className='py-3 px-8 bg-white font-bold hover:scale-105 hover:underline hover:underline-offset-1 rounded-full cursor-pointer'>
              Find songs
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}
