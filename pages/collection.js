import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFavoriteMusic } from '../lib/firebaseAction'
import Image from 'next/image'
import Link from 'next/link'
import { MusicIcon, ArrowBackIcon } from '../components/Icon'
import PlaylistsBody from '../components/PlaylistsBody'
import { useRouter } from 'next/router'
export default function Collection() {
  const [data, setData] = useState('')
  const router = useRouter()
  const authKey = useSelector((state) => state.auth.authKey)
  const allMusic = useSelector((state) => state.collection.items)
  useEffect(() => {
    const getData = async () => {
      const result = await getAllFavoriteMusic(`collection/${authKey}/items`)
      setData(result)
    }
    getData()
    document.title = 'Spotify - Favorite'
  }, [allMusic])
  return (
    <>
      <div className='lg:pt-20 pt-16 pb-48 lg:px-9 sm:px-6 px-4 flex lg:bg-likedBg bg-collectionMobileBg lg:items-end items-start'>
        <div className='w-60 h-60 shadow-3xl hidden lg:block'>
          <Image src='/loveImg.png' width='240' height='240' className='' />
        </div>
        <div className='lg:px-6'>
          <div
            className='uppercase text-white font-bold text-xs mb-2 hidden lg:block'
            style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            Playlist
          </div>
          <div
            className='text-white font-bold lg:text-8xl text-3xl lg:mb-12 mb-4'
            style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            Favorite Song
          </div>
          <div className='text-white text-xs font-bold' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            User - {data.length} song
          </div>
        </div>
        <ArrowBackIcon
          width='24'
          height='24'
          className='lg:hidden fill-white absolute top-4 left-4'
          onClick={() => router.back()}
        />
      </div>
      {data.length > 0 ? (
        <PlaylistsBody playlistItems={data} path={`collection/${authKey}/items`} />
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
    </>
  )
}
