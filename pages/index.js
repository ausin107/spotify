import { loadTrendingMusic } from '../lib/loadData'
import Row from '../components/Row'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MusicPlayer from '../components/MusicPlayer'
export async function getStaticProps() {
  const VietNamTrendingMusic = await loadTrendingMusic('VN')
  const KoreaTrendingMusic = await loadTrendingMusic('KR')
  const GlobalTrendingMusic = await loadTrendingMusic('')
  return {
    props: {
      VietNamTrendingMusic: VietNamTrendingMusic.items,
      KoreaTrendingMusic: KoreaTrendingMusic.items,
      GlobalTrendingMusic: GlobalTrendingMusic.items,
    },
  }
}
export default function Home({ VietNamTrendingMusic, KoreaTrendingMusic, GlobalTrendingMusic }) {
  return (
    <div className='bg-bgColor h-fit flex flex-col'>
      <Sidebar />
      <Navbar />
      <div className='left-[16.666%] w-[82vw] overflow-hidden h-full relative bg-bgColor pb-24'>
        <div className='h-80 bg-mainContainerBg absolute w-screen'></div>
        <div className='pt-16 relative z-10'>
          <Row title='Top Thịnh Hành Tại Việt Nam' data={VietNamTrendingMusic} />
          <Row title='Đang Hot Tại Hàn Quốc' data={KoreaTrendingMusic} />
          <Row title='Bảng Phát Hành Mới Nổi Tiếng' data={GlobalTrendingMusic} />
        </div>
      </div>
      <div className='fixed bottom-0 w-screen bg-notAuthBannerBg h-16 z-20 flex justify-between items-center px-10'>
        <div className='text-white'>
          <div className=' uppercase '>Xem trước Spotify</div>
          <div className=' font-bold '>
            Đăng ký để nghe không giới hạn và lưu những bài hát của bạn vào playlist. Chỉ cần để lại
            1 star cho mình :{'>'}
          </div>
        </div>
        <div className='text-black text-lg font-semibold tracking-wide hover:scale-105 cursor-pointer bg-white p-2 px-6 rounded-full'>
          Đăng ký miễn phí
        </div>
      </div>
      <MusicPlayer />
    </div>
  )
}
