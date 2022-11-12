import { PlayIcon, PauseIcon } from './Icon'
import { useDispatch, useSelector } from 'react-redux/'
import { showMusicPlayer, setPlayPauseMusic, setNotPlayList } from './music_player/musicPlayerSlice'
import { updateCurrentPlInfo, startLoading } from './extPlaylists/extPlaylistsSlice'
import { useRouter } from 'next/router'
import LazyImage from './LazyImage'
export default function RowItem({ data }) {
  const dispatch = useDispatch()
  const { musicId, isPlay } = useSelector((state) => state.player)
  let title = data.snippet.title.replace(/official|music|video|\(|\)|\|/gi, '')
  title = title.length > 30 ? title.slice(0, 30) + '...' : title
  const curentMusicId = data.id.videoId || data.id
  const router = useRouter()
  const handleShow = () => {
    if (router.pathname == '/search/playlists') {
      dispatch(startLoading())
      dispatch(updateCurrentPlInfo(data))
      router.push('/search/playlist')
    } else {
      dispatch(setNotPlayList())
      const musicInfo = {
        musicId: curentMusicId,
        musicData: data,
      }
      if (musicId != curentMusicId) {
        dispatch(showMusicPlayer(musicInfo))
      } else if (musicId == curentMusicId) {
        dispatch(setPlayPauseMusic())
      }
    }
  }
  return (
    <div className='text-white lg:p-4 lg:pb-5 w-full cursor-pointer relative group lg:bg-itemBg lg:hover:bg-itemActiveBg rounded h-full'>
      <LazyImage
        className='lg:rounded lg:mb-4 mb-3 shadow-2xl lg:w-48 lg:h-44 sm:h-56 sm:w-60 h-36 w-40 object-cover skeleton'
        lazySrc={data.snippet.thumbnails.medium.url}
        alt=''
      />
      <div
        className='group-hover:visible group-hover:translate-y-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 invisible translate-y-2 opacity-0 p-3 d-flex bg-playIconBg absolute rounded-full right-2 bottom-[3.3rem] sm:right-6 sm:bottom-12 lg:bottom-[5.5rem]'
        onClick={handleShow}>
        {isPlay && musicId == curentMusicId ? (
          <PauseIcon width='24' height='24' className='fill-black' />
        ) : (
          <PlayIcon width='24' height='24' className='fill-black' />
        )}
      </div>
      <div className='text-white font-semibold text-xs lg:text-base text-center lg:text-start'>{title}</div>
    </div>
  )
}
