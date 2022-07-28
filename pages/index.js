import {
  SpotifyLogo,
  HomeIcon,
  HomeIconActive,
  SearchIcon,
  SearchIconActive,
  LibraryIcon,
  LibraryIconActive,
  PlusIcon,
  LoveIcon,
} from '../component/Icon'
export default function Home() {
  return (
    <div className=' bg-bgColor w-screen h-screen flex flex-row'>
      <div className='bg-bgColor fixed h-screen lg:w-2/12'>
        <div className='p-6'>
          <SpotifyLogo className='text-white text-sm w-[60%] sm:mb-8 hover:cursor-pointer' />
          <div className='mb-8'>
            <div className='text-iconColor mb-4 flex font-semibold icon-class'>
              <HomeIcon className='fill-iconColor mr-4 font-semibold' />
              <HomeIconActive className='fill-white mr-4 hidden' />
              Trang chủ
            </div>
            <div className='text-iconColor mb-4 flex font-semibold icon-class'>
              <SearchIcon className='fill-iconColor mr-4 font-semibold ' />
              <SearchIconActive className='fill-white mr-4 hidden' />
              Tìm kiếm
            </div>
            <div className='text-iconColor mb-4 flex font-semibold icon-class'>
              <LibraryIcon className='fill-iconColor mr-4 font-semibold' />
              <LibraryIconActive className='fill-white mr-4 hidden' />
              Thư viện
            </div>
          </div>
          <div className=''>
            <div className='flex text-iconColor mb-4 font-semibold items-center icon-class'>
              <div className='bg-iconColor mr-4 p-[0.4rem] rounded icon-bg'>
                <PlusIcon className='fill-black' />
              </div>
              Tạo playlist
            </div>
            <div className='flex text-iconColor mb-4 font-semibold items-center icon-class'>
              <div className='bg-loveIconBg mr-4 p-[0.4rem] rounded'>
                <LoveIcon className='fill-iconColor' />
              </div>
              Bài hát đã thích
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
