import { loadTrendingMusic } from '../lib/loadData'
import { useEffect } from 'react'
import Row from '../components/Row'
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
  useEffect(() => {
    document.title = 'Spotify - Home'
  }, [])
  return (
    <div className='pb-24'>
      <div className='h-80 bg-mainContainerBg absolute w-screen'></div>
      <div className='pt-16 relative z-10'>
        <Row title='Top Thịnh Hành Tại Việt Nam' data={VietNamTrendingMusic} />
        <Row title='Đang Hot Tại Hàn Quốc' data={KoreaTrendingMusic} />
        <Row title='Bảng Phát Hành Mới Nổi Tiếng' data={GlobalTrendingMusic} />
      </div>
    </div>
  )
}
