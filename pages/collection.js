import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFavoriteMusic } from '../lib/firebaseAction'
import Image from 'next/image'
import Link from 'next/link'
import { showMusicPlayer, setEnded } from '../components/music_player/musicPlayerSlice'
import { MusicIcon } from '../components/Icon'
import PlaylistsBody from '../components/PlaylistsBody'
export default function Collection() {
  const [data, setData] = useState('')
  const dispatch = useDispatch()
  const authKey = useSelector((state) => state.auth.authKey)
  const isPlayList = useSelector((state) => state.player.isPlayList)
  const currentId = useSelector((state) => state.collection.currentId)
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
        <PlaylistsBody data={data} path={`collection/${authKey}/items`} />
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
