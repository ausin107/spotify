import { useEffect, useState } from 'react'
import Link from 'next/link'
import { showMusicPlayer, setPlayPauseMusic, setPlayList } from '../components/music_player/musicPlayerSlice'
import { getCollection } from '../components/collection/collectionAction'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFavoriteMusic } from '../lib/firebaseAction'
import { PlayIcon, PauseIcon, MusicIconV2, PlusIcon } from '../components/Icon'
import { useRouter } from 'next/router'
import { addMusicToPlayList, getAllPlaylistsInfo } from '../lib/firebaseAction'
import { loadAllPlaylist } from '../components/playlists/playlistSlice'
import { setShow } from '../components/toast/toastSlice'
export default function Library() {
  const [data, setData] = useState('')
  const dispatch = useDispatch()
  const authKey = useSelector((state) => state.auth.authKey)
  const isPlay = useSelector((state) => state.player.isPlay)
  const isPlayList = useSelector((state) => state.player.isPlayList)
  const allMusic = useSelector((state) => state.collection.items)
  const playlists = useSelector((state) => state.playlist.allPlaylist)
  const extPlaylists = useSelector((state) => state.extplaylist.allExtPlaylist)
  const router = useRouter()
  useEffect(() => {
    const getData = async () => {
      const result = await getAllFavoriteMusic(`collection/${authKey}/items`)
      setData(result)
    }
    getData()
    document.title = 'Spotify - Library'
  }, [allMusic])
  const handlePlay = (e) => {
    e.stopPropagation()
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
  const handleCreatePl = async () => {
    let newPLInfo = {}
    if (playlists.length == 0) {
      newPLInfo.title = 'My Playlist #1'
      newPLInfo.description = ''
    } else {
      newPLInfo.title = 'My Playlist #' + (playlists.length + 1)
      newPLInfo.description = ''
    }
    const playlistId = await addMusicToPlayList(`collection/${authKey}/playlists`, newPLInfo)
    const newPlaylist = await getAllPlaylistsInfo(`collection/${authKey}/playlists`)
    dispatch(loadAllPlaylist(newPlaylist))
    router.push(`/playlists/${playlistId}`)
    dispatch(setShow('Created new playlist to library'))
  }
  return (
    <div className='lg:pb-80 pb-40 lg:pt-12 sm:lg-4 pt-12'>
      <div className='sm:m-8 m-4 pb-16 border-b border-searchChildBg'>
        <div className='text-white font-bold mb-6 text-2xl lg:hidden block'>Library</div>
        <div className='text-white font-bold mb-6 text-2xl hidden lg:block'>Playlist</div>
        <div className='grid'>
          <Link href='/collection'>
            <div className='p-5 w-96 h-64 mb-4 bg-favoriteBg rounded-md flex flex-col justify-end cursor-pointer group relative'>
              <div className='text-white font-bold mb-4 text-4xl'>Favorite Song</div>
              <div
                className='group-hover:visible group-hover:translate-y-0 hover:scale-105 group-hover:opacity-100 transition-all duration-300 invisible translate-y-5 opacity-0 p-3 d-flex bg-playIconBg absolute rounded-full right-6 bottom-4 bottomShadow'
                onClick={handlePlay}>
                {isPlay && isPlayList ? (
                  <PauseIcon width='24' height='24' className='fill-black' />
                ) : (
                  <PlayIcon width='24' height='24' className='fill-black' />
                )}
              </div>
              <div className='text-white font-semibold text-lg'>{data.length} favorite songs</div>
            </div>
          </Link>
          {!!playlists &&
            playlists.map((item) => {
              const plTitle = item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title
              return (
                <Link key={item.playListId} href={'/playlists/' + item.playListId}>
                  <div className='flex mb-4 items-center'>
                    <div className='w-14 h-14 shadow-3xl bg-itemActiveBg flex items-center justify-center mr-4'>
                      <MusicIconV2 width='24' height='24' className='fill-textBreakLine' />
                    </div>
                    <div className=''>
                      <div className='text-white font-semibold mb-1 icon-class'>{plTitle}</div>
                      <div className='text-iconColor font-semibold icon-class text-sm'>Playlist</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          {!!extPlaylists &&
            extPlaylists.map((item) => {
              const plTitle = item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title
              return (
                <Link key={item.playListId} href={'/extplaylists/' + item.playListId}>
                  <div className='flex mb-4 items-center'>
                    <div className='w-14 h-14 shadow-3xl bg-itemActiveBg flex items-center justify-center mr-4'>
                      <MusicIconV2 width='24' height='24' className='fill-textBreakLine' />
                    </div>
                    <div className=''>
                      <div className='text-white font-semibold mb-1 icon-class'>{plTitle}</div>
                      <div className='text-iconColor font-semibold icon-class text-sm'>Playlist</div>
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
        <PlusIcon
          width='24'
          height='24'
          className='fill-white lg:hidden absolute top-4 right-4'
          onClick={handleCreatePl}
        />
      </div>
    </div>
  )
}
