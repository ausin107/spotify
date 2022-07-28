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
  BackIcon,
  NextIcon,
} from '../component/Icon'
export default function Home() {
  return (
    <div className=' bg-bgColor w-screen h-screen flex flex-col'>
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
      <div className='bg-navbarBg flex flex-row h-16 w-10/12 fixed left-[16.666%] justify-between items-center'>
        <div className='flex items-center ml-5'>
          <div className='bg-black opacity-70 py-1 mr-6 rounded-full'>
            <BackIcon className='fill-navigateIcon' />
          </div>
          <div className='bg-black opacity-70 py-1 mr-4 rounded-full'>
            <NextIcon className='fill-navigateIcon' />
          </div>
        </div>
        <div className='flex items-center'>
          <div className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'>
            Premium
          </div>
          <div className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'>
            Hổ trợ
          </div>
          <div className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'>
            Tải xuống
          </div>
          <div className='mr-7 border-l-[1px] border-white py-3'></div>
          <div className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'>
            Đăng ký
          </div>
          <div className='text-black text-lg font-semibold mr-7 tracking-wide hover:scale-105 cursor-pointer bg-white p-2 px-6 rounded-full'>
            Đăng nhập
          </div>
        </div>
      </div>
    </div>
  )
}
