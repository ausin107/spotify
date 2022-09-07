import React from 'react'
import RowItem from './RowItem'
import { updateCurrentPlInfo } from './extPlaylists/extPlaylistsSlice'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { setNotPlayList, setPlayPauseMusic, showMusicPlayer } from './music_player/musicPlayerSlice'
export default function MusicSearchRow({ musicData, title }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const musicState = useSelector((state) => state.player)
  const handleShow = (musicId, data) => {
    if (router.pathname == '/search/playlists') {
      dispatch(updateCurrentPlInfo(data))
      router.push('/search/playlist')
    } else {
      dispatch(setNotPlayList())
      const musicInfo = {
        musicId,
        musicData: data,
      }
      if (musicState.musicId != musicId) {
        dispatch(showMusicPlayer(musicInfo))
      } else if (musicState.musicId == musicId) {
        dispatch(setPlayPauseMusic())
      }
    }
  }
  return (
    <>
      <div className='mb-20 px-8 lg:block hidden'>
        {!!title && <div className='text-white font-bold text-2xl mb-8'>{title}</div>}
        <div className='grid grid-cols-5 gap-4'>
          {musicData.map((item, index) => {
            return <RowItem key={index} data={item} />
          })}
        </div>
      </div>
      <div className='px-4 block lg:hidden mb-20'>
        {musicData.map((item, index) => {
          let title = item.snippet.title
            .replace('Official Music Video', '')
            .replace('(', '')
            .replace(')', '')
            .replaceAll('|', '')
          title = title.length > 80 ? title.slice(0, 80) + '...' : title
          return (
            <div key={index} className='flex mb-4 items-center' onClick={() => handleShow(item.id.videoId, item)}>
              <img
                draggable={false}
                className='shadow-2xl h-14 w-14 object-cover mr-4'
                src={item.snippet.thumbnails.medium.url}
                alt=''
              />
              <div className=''>
                <div className='text-white font-semibold mb-1'>{title}</div>
                <div className='text-iconColor text-xs font-semibold'>
                  {item.snippet.channelTitle.replace('Official', '').trim()}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
