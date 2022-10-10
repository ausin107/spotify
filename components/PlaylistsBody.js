import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { PlayIcon, PauseIcon, OptionIcons } from './Icon'
import { getCollection } from './collection/collectionAction'
import { getAllPlaylistsInfo, removeDocument, addFavoriteMusic } from '../lib/firebaseAction'
import { setPlayList, setPlayPauseMusic, showMusicPlayer } from './music_player/musicPlayerSlice'
import { loadAllPlaylist } from './playlists/playlistSlice'
import { loadAllExtPlaylists } from './extPlaylists/extPlaylistsSlice'
import { setShow } from './toast/toastSlice'
import { loadItemsSuccess, setOriginItems } from './collection/collectionSlice'
import MusicsList from './MusicsList'
export default function PlaylistsBody({ playlistItems, path, currentPlId, extPlaylistInfo, isLovedPl }) {
  const [isShowPlMenu, setShowPlMenu] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const playListId = router.query.id
  const authKey = useSelector((state) => state.auth.authKey)
  const isPlay = useSelector((state) => state.player.isPlay)
  const extPlId = typeof extPlaylistInfo?.id == 'object' ? extPlaylistInfo?.id?.playlistId : extPlaylistInfo?.id
  const handlePlay = () => {
    if (currentPlId == playListId && !extPlaylistInfo) {
      dispatch(setPlayList())
      let newPlItems = [...playlistItems]
      newPlItems.map((item, index) => {
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
    } else if (!!extPlaylistInfo) {
      dispatch(setPlayList())
      let newPlItems = [...playlistItems]
      newPlItems.map((item, index) => {
        if (index == 0) {
          let musicId = item.snippet.resourceId.videoId
          const musicInfo = {
            musicData: item,
            musicId,
          }
          dispatch(showMusicPlayer(musicInfo))
        }
      })
      dispatch(loadItemsSuccess({ data: newPlItems, index: 0 }))
      dispatch(setOriginItems(newPlItems))
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
  const handleAddPLinLib = async () => {
    handleShowOption()
    await addFavoriteMusic(`collection/${authKey}/extplaylists/${extPlId}`, {
      playListId: extPlId,
      title: extPlaylistInfo.snippet.title,
    })
    dispatch(setShow('Saved to Your Library'))
    const data = await getAllPlaylistsInfo(`collection/${authKey}/extplaylists`)
    dispatch(loadAllExtPlaylists(data))
  }
  const handleRemovePLinLib = async () => {
    handleShowOption()
    await removeDocument(`collection/${authKey}/extplaylists/${extPlId}`)
    dispatch(setShow('Removed from Your Library'))
    const data = await getAllPlaylistsInfo(`collection/${authKey}/extplaylists`)
    dispatch(loadAllExtPlaylists(data))
  }
  const buttonStatus = () => {
    if (playlistItems.length > 0) {
      if (isPlay && (currentPlId == playListId || !!extPlId)) {
        return (
          <div
            onClick={handlePause}
            className='p-4 bg-playIconBg hover:bg-activeIconHover rounded-full hover:scale-105 w-fit cursor-pointer mr-8'>
            <PauseIcon className='fill-black' width='24' height='24' />
          </div>
        )
      } else {
        return (
          <div
            onClick={handlePlay}
            className='p-4 bg-playIconBg hover:bg-activeIconHover rounded-full hover:scale-105 w-fit cursor-pointer mr-8'>
            <PlayIcon className='fill-black' width='24' height='24' />
          </div>
        )
      }
    }
  }
  const optionMenu = () => {
    if (currentPlId == playListId && !extPlaylistInfo) {
      return (
        <div
          className='px-4 pr-16 py-2 text-optionText font-semibold hover:bg-searchChildBg rounded-sm'
          onClick={handleRemovePL}>
          Delete playlist
        </div>
      )
    } else {
      if (!isLovedPl) {
        return (
          <div
            className='px-4 pr-16 py-2 text-optionText font-semibold hover:bg-searchChildBg rounded-sm'
            onClick={handleAddPLinLib}>
            Add to Your Library
          </div>
        )
      } else {
        return (
          <div
            className='px-4 pr-16 py-2 text-optionText font-semibold hover:bg-searchChildBg rounded-sm'
            onClick={handleRemovePLinLib}>
            Remove from Your Library
          </div>
        )
      }
    }
  }
  return (
    <div className='flex lg:px-9 sm:px-6 px-4 -top-40 relative pt-4 bg-resultBg flex-col '>
      <div className='flex items-center mb-8'>
        {buttonStatus()}
        {router.pathname != '/collection' && (
          <div className='cursor-pointer'>
            <OptionIcons
              width='36'
              height='36'
              className='fill-iconColor hover:fill-white'
              onClick={handleShowOption}
            />
            {isShowPlMenu && (
              <div className='fixed w-screen h-screen top-0 left-0 z-50' onClick={handleShowOption}>
                <div
                  className='absolute bg-itemActiveBg p-1 rounded lg:top-[27vw] lg:left-[24vw] sm:top-[59vw] sm:left-[22vw] top-[85vw] left-[35vw]  shadow-2xl'
                  onClick={(e) => e.stopPropagation()}>
                  <div className='px-4 pr-16 py-2 text-optionText font-semibold hover:bg-searchChildBg rounded-sm'>
                    Add to waiting list
                  </div>
                  <div className='border-searchChildBg border-y'>
                    <div className='px-4 pr-16 py-2 text-optionText font-semibold hover:bg-searchChildBg rounded-sm'>
                      Report
                    </div>
                    {optionMenu()}
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
      {playlistItems.length > 0 && <MusicsList data={playlistItems} path={path} />}
    </div>
  )
}
