import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
export default function AdvertisementBanner() {
  const bannerRef = useRef()
  const isShow = useSelector((state) => state.player.isShow)
  const router = useRouter()
  useEffect(() => {
    if (isShow) {
      bannerRef.current.style.zIndex = 20
    } else bannerRef.current.style.zIndex = 40
  }, [])
  return (
    <div
      className='fixed bottom-0 cursor-pointer w-screen bg-notAuthBannerBg h-16 flex justify-between items-center px-10'
      ref={bannerRef}
      onClick={() => router.push('/signup')}>
      <div className='text-white'>
        <div className=' uppercase '>Xem trước Spotify</div>
        <div className=' font-bold '>
          Đăng ký để nghe không giới hạn và lưu những bài hát của bạn vào playlist. Chỉ cần để lại 1
          star cho mình :{'>'}
        </div>
      </div>
      <Link href='/signup'>
        <div className='text-black text-lg font-semibold tracking-wide hover:scale-105 cursor-pointer bg-white p-2 px-6 rounded-full'>
          Đăng ký miễn phí
        </div>
      </Link>
    </div>
  )
}
