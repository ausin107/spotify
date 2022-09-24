import { loadTrendingMusic } from '../lib/loadData'
import { useEffect, useRef, useState } from 'react'
import { ClosePlayerIcon, SettingIcon, SpinIcon } from '../components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import Row from '../components/Row'
import { useRouter } from 'next/router'
import { logoutSuccess } from '../components/auth/authSlice'
export async function getStaticProps() {
  const VNMusic = await loadTrendingMusic('VN')
  const KRMusic = await loadTrendingMusic('KR')
  const GMusic = await loadTrendingMusic('')
  return {
    props: {
      VNMusic: VNMusic?.items || null,
      KRMusic: KRMusic?.items || null,
      GMusic: GMusic?.items || null,
    },
  }
}
export default function Home({ VNMusic, KRMusic, GMusic }) {
  const [auth, setAuth] = useState(false)
  const isAuth = useSelector((state) => state.auth.isAuth)
  const settingRef = useRef()
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Spotify - Home'
    setAuth(isAuth)
  }, [])
  const handleLogout = () => {
    dispatch(logoutSuccess())
    window.localStorage.removeItem('authKey')
    router.push('/')
    setTimeout(() => {
      router.reload()
    }, 700)
  }
  const handleShowSetting = () => {
    settingRef.current.classList.toggle('hiddenSetting')
  }
  return (
    <>
      <div className='pb-24'>
        <div className='h-80 bg-mainContainerBg absolute w-screen'></div>
        {!!VNMusic && !!KRMusic && !!GMusic ? (
          <div className='pt-16 relative z-10'>
            <Row title='Top Thịnh Hành Tại Việt Nam' data={VNMusic} />
            <Row title='Đang Hot Tại Hàn Quốc' data={KRMusic} />
            <Row title='Bảng Phát Hành Mới Nổi Tiếng' data={GMusic} />
          </div>
        ) : (
          <div className='w-full h-screen flex items-center justify-center'>
            <SpinIcon width={36} className='animate-spin text-white' />
          </div>
        )}
        <SettingIcon
          width='24'
          height='24'
          className='absolute top-4 right-4 fill-white lg:hidden z-20'
          onClick={handleShowSetting}
        />
        <div
          className='fixed lg:hidden p-10 pt-16 bg-black w-screen h-screen z-20 top-0 left-0 transition-all duration-500 opacity-100 hiddenSetting'
          ref={settingRef}>
          <div className='text-iconColor text-2xl font-bold mb-5'>Account</div>
          <div className='text-iconColor text-2xl font-bold mb-5'>Profile</div>
          {auth ? (
            <div className='text-white text-2xl font-bold mb-5' onClick={handleLogout}>
              Log out
            </div>
          ) : (
            <div className='text-white text-2xl font-bold mb-5' onClick={() => router.push('/login')}>
              Login
            </div>
          )}
          <div className='border-white border w-4 mb-5'></div>
          <div className='text-iconColor text-lg font-bold mb-3'>Premium</div>
          <div className='text-iconColor text-lg font-bold mb-3'>Support</div>
          <div className='text-iconColor text-lg font-bold mb-3'>Download</div>
          <div className='text-iconColor text-lg font-bold mb-3'>Privacy</div>
          <div className='text-iconColor text-lg font-bold mb-3'>Rules</div>
          <ClosePlayerIcon
            width='24'
            height='24'
            className='fill-white absolute top-4 right-4'
            onClick={handleShowSetting}
          />
        </div>
      </div>
    </>
  )
}
