import { useDispatch, useSelector } from 'react-redux'
import { PlayIcon, PauseIcon, ClockIcon } from './Icon'
import PlayListItem from './PlayListItem'
import { getCollection } from './collection/collectionAction'
import { setPlayList, setPlayPauseMusic, showMusicPlayer } from './music_player/musicPlayerSlice'
export default function PlaylistsBody({ data }) {
  const dispatch = useDispatch()
  const isPlayList = useSelector((state) => state.player.isPlayList)
  const isPlay = useSelector((state) => state.player.isPlay)
  const authKey = useSelector((state) => state.auth.authKey)

  const handlePlay = () => {
    if (!isPlayList) {
      dispatch(setPlayList())
      data.map((item, index) => {
        if (index == 0) {
          let musicId = typeof item.id == 'object' ? item.id.videoId : item.id
          const musicInfo = {
            musicData: item,
            musicId,
          }
          dispatch(getCollection(`collection/${authKey}/items`))
          dispatch(showMusicPlayer(musicInfo))
        }
      })
    } else if (isPlayList) {
      dispatch(setPlayPauseMusic())
    }
  }
  return (
    <div className='flex px-9 -top-40 relative pt-4 bg-resultBg flex-col '>
      <div
        onClick={handlePlay}
        className='p-4 bg-playIconBg hover:bg-activeIconHover rounded-full hover:scale-105 mb-8 w-fit cursor-pointer'>
        {isPlay && isPlayList ? (
          <PauseIcon className='fill-black' width='24' height='24' />
        ) : (
          <PlayIcon className='fill-black' width='24' height='24' />
        )}
      </div>
      <div className='flex px-6 pb-2'>
        <div className='text-iconColor text-sm w-[3%]'>#</div>
        <div className='text-iconColor text-sm w-2/5'>NAME</div>
        <div className='text-iconColor text-sm w-1/4'>ALBUM</div>
        <div className='text-iconColor text-sm w-1/5'>DATE</div>
        <div className='text-iconColor text-sm w-[10%] flex justify-end'>
          <ClockIcon width='16' height='16' className='fill-iconColor hover:fill-white' />
        </div>
        <div className='text-iconColor text-sm w-[3%]'></div>
      </div>
      <div className='border-t border-searchChildBg flex flex-col pt-4 pb-4'>
        {data.map((item, index) => {
          return <PlayListItem key={index} data={item} index={index} />
        })}
      </div>
    </div>
  )
}
