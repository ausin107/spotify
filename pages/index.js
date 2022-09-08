import { loadTrendingMusic } from '../lib/loadData'
import { useEffect } from 'react'
import Row from '../components/Row'
export async function getStaticProps() {
  const VNMusic = await loadTrendingMusic('VN')
  const KRMusic = await loadTrendingMusic('KR')
  const GMusic = await loadTrendingMusic('')
  return {
    props: {
      VNMusic: VNMusic?.items,
      KRMusic: KRMusic?.items,
      GMusic: GMusic?.items,
    },
  }
}
export default function Home({ VNMusic, KRMusic, GMusic }) {
  useEffect(() => {
    document.title = 'Spotify - Home'
  }, [])
  return (
    <div className='pb-24'>
      <div className='h-80 bg-mainContainerBg absolute w-screen'></div>
      {!!VNMusic && !!KRMusic && !!GMusic && (
        <div className='pt-16 relative z-10'>
          <Row title='Top Thịnh Hành Tại Việt Nam' data={VNMusic} />
          <Row title='Đang Hot Tại Hàn Quốc' data={KRMusic} />
          <Row title='Bảng Phát Hành Mới Nổi Tiếng' data={GMusic} />
        </div>
      )}
    </div>
  )
}
