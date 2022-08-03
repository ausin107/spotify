import React from 'react'

export default function AdvertisementBanner() {
  return (
    <div className='fixed bottom-0 w-screen bg-notAuthBannerBg h-16 z-20 flex justify-between items-center px-10'>
      <div className='text-white'>
        <div className=' uppercase '>Xem trước Spotify</div>
        <div className=' font-bold '>
          Đăng ký để nghe không giới hạn và lưu những bài hát của bạn vào playlist. Chỉ cần để lại 1
          star cho mình :{'>'}
        </div>
      </div>
      <div className='text-black text-lg font-semibold tracking-wide hover:scale-105 cursor-pointer bg-white p-2 px-6 rounded-full'>
        Đăng ký miễn phí
      </div>
    </div>
  )
}
