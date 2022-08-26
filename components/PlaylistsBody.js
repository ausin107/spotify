import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayIcon, PauseIcon, ClockIcon, OptionIcons } from './Icon'
import PlayListItem from './PlayListItem'
import { getCollection } from './collection/collectionAction'
import { getAllPlaylistsInfo, removeDocument } from '../lib/firebaseAction'
import { setPlayList, setPlayPauseMusic, showMusicPlayer } from './music_player/musicPlayerSlice'
import { useRouter } from 'next/router'
import { loadAllPlaylist } from './playlists/playlistSlice'
import { setShow } from './toast/toastSlice'
import MusicsList from './MusicsList'
export default function PlaylistsBody({ data, path, currentPlId }) {
  const [isShowPlMenu, setShowPlMenu] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const playListId = router.query.id
  const authKey = useSelector((state) => state.auth.authKey)
  const isPlay = useSelector((state) => state.player.isPlay)
  const handlePlay = () => {
    if (currentPlId == playListId) {
      dispatch(setPlayList())
      data.map((item, index) => {
        if (index == 0) {
          let musicId = typeof item.id == 'object' ? item.id.videoId : item.id
          const musicInfo = {
            musicData: item,
            musicId,
          }
          dispatch(getCollection(path))
          dispatch(showMusicPlayer(musicInfo))
        }
      })
    }
  }
  const handlePause = () => {
    dispatch(setPlayPauseMusic())
  }
  const handleShowOption = () => {
    const containerRef = document.querySelector('#container')
    if (isShowPlMenu) {
      setShowPlMenu(false)
      containerRef.classList.toggle('!h-screen')
    } else {
      setShowPlMenu(true)
      containerRef.classList.toggle('!h-screen')
    }
  }
  const handleRemovePL = async () => {
    await removeDocument(path.replace('/items', ''))
    const newPlaylist = await getAllPlaylistsInfo(`collection/${authKey}/playlists`)
    dispatch(loadAllPlaylist(newPlaylist))
    router.back()
    handleShowOption()
    dispatch(setShow('Deleted from Library'))
  }
  return (
    <div className='flex px-9 -top-40 relative pt-4 bg-resultBg flex-col '>
      <div className='flex items-center mb-8'>
        {data.length > 0 && (
          <div>
            {isPlay && currentPlId == playListId ? (
              <div
                onClick={handlePause}
                className='p-4 bg-playIconBg hover:bg-activeIconHover rounded-full hover:scale-105 w-fit cursor-pointer'>
                <PauseIcon className='fill-black' width='24' height='24' />
              </div>
            ) : (
              <div
                onClick={handlePlay}
                className='p-4 bg-playIconBg hover:bg-activeIconHover rounded-full hover:scale-105 w-fit cursor-pointer'>
                <PlayIcon className='fill-black' width='24' height='24' />
              </div>
            )}
          </div>
        )}
        {router.pathname != '/collection' && (
          <div className='ml-8 cursor-pointer'>
            <OptionIcons
              width='36'
              height='36'
              className='fill-iconColor hover:fill-white'
              onClick={handleShowOption}
            />
            {isShowPlMenu && (
              <div className='fixed w-screen h-screen top-0 left-0 z-50' onClick={handleShowOption}>
                <div
                  className='absolute bg-itemActiveBg p-1 rounded top-[27vw] left-[24vw] shadow-2xl'
                  onClick={(e) => e.stopPropagation()}>
                  <div className='px-4 pr-16 py-2 text-optionText font-semibold hover:bg-searchChildBg rounded-sm'>
                    Add to waiting list
                  </div>
                  <div className='border-searchChildBg border-y'>
                    <div className='px-4 pr-16 py-2 text-optionText font-semibold hover:bg-searchChildBg rounded-sm'>
                      Edit details
                    </div>
                    <div
                      className='px-4 pr-16 py-2 text-optionText font-semibold hover:bg-searchChildBg rounded-sm'
                      onClick={handleRemovePL}>
                      Delete playlist
                    </div>
                  </div>
                  <div className='px-4 pr-16 py-2 text-optionText font-semibold hover:bg-searchChildBg rounded-sm'>
                    Share
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {data.length > 0 && <MusicsList data={data} path={path} />}
    </div>
  )
}
