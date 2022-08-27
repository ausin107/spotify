import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getAllPlaylistMusics } from '../../lib/firebaseAction'
import { loadSearchMusic, loadTrendingMusic } from '../../lib/loadData'
import { SearchIcon, EmptyIcon, MusicIconV2 } from '../../components/Icon'
import { setCurrentPlayList } from '../../components/collection/collectionSlice'
import PlaylistSearchItem from '../../components/PlaylistSearchItem'
import PlaylistsBody from '../../components/PlaylistsBody'
import PlaylistHeader from '../../components/PlaylistHeader'
export default function PlayList() {
  const [data, setData] = useState('')
  const [isShow, setShow] = useState(true)
  const [searchData, setSearchData] = useState()
  const [inputValue, setInputValue] = useState('')
  const [recData, setRecData] = useState('')
  const router = useRouter()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const playListId = router.query.id
  const authKey = useSelector((state) => state.auth.authKey)
  const allMusic = useSelector((state) => state.collection.items)
  const isPlayList = useSelector((state) => state.player.isPlayList)
  useEffect(() => {
    dispatch(setCurrentPlayList(playListId))
    const getPlaylist = async () => {
      const data = await getAllPlaylistMusics(`collection/${authKey}/playlists/${playListId}/items`)
      setData(data)
      const recData = await loadTrendingMusic('VN')
      setRecData(recData.items)
    }
    getPlaylist()
  }, [allMusic, playListId])
  const handleSumbit = async () => {
    const musicData = await loadSearchMusic(inputValue, 10, '&order=viewCount')
    setSearchData(musicData.items)
  }
  const handleClear = () => {
    setInputValue('')
    inputRef.current.focus()
  }
  const handleEnter = (e) => {
    if (e.key == 'Enter') {
      handleSumbit()
    }
  }
  return (
    <div className=''>
      <PlaylistHeader data={data} path={`collection/${authKey}/playlists/${playListId}`} />
      <PlaylistsBody
        data={data}
        path={`collection/${authKey}/playlists/${playListId}/items`}
        currentPlId={playListId}
      />
      {isShow ? (
        <div className='bg-resultBg px-8 pt-20 relative -top-40'>
          <div className='border-t border-searchChildBg mb-8'></div>
          <div className='flex items-center justify-between'>
            <div className=''>
              <div className='text-white text-2xl font-bold mb-6'>Search your music and podcast now</div>
              <div className='flex items-center'>
                <div className='w-[26rem] bg-searchChildBg rounded flex py-2 px-3 mr-2 items-center'>
                  <SearchIcon height='16' width='16' className='fill-iconColor mr-2' />
                  <input
                    value={inputValue}
                    placeholder='Search music name and podcast'
                    className='w-[22rem] outline-none font-semibold bg-transparent text-iconColor text-sm'
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleEnter(e)}
                    ref={inputRef}
                  />
                  <EmptyIcon className='fill-iconColor cursor-pointer' width='16' height='16' onClick={handleClear} />
                </div>
                <button
                  onClick={handleSumbit}
                  className='w-[4.5rem] py-[0.35rem] bg-activeIcon hover:bg-activeIconHover hover:scale-105 rounded font-semibold'>
                  Search
                </button>
              </div>
            </div>
            <div className='mr-2'>
              <EmptyIcon
                onClick={() => setShow(false)}
                className='fill-iconColor cursor-pointer hover:fill-white'
                width='24'
                height='24'
              />
            </div>
          </div>
          <div className='mt-8'>
            {!!searchData &&
              searchData.map((item, index) => {
                return <PlaylistSearchItem key={index} data={item} />
              })}
          </div>
        </div>
      ) : (
        <div className='bg-resultBg px-8 pt-8 pb-20 relative -top-40'>
          <div
            className='text-iconColor cursor-pointer font-semibold flex justify-end mr-8 hover:text-white'
            onClick={() => setShow(true)}>
            FIND MORE
          </div>
        </div>
      )}
      <div className='px-8 pt-10 relative -top-40'>
        <div className='text-white text-2xl font-bold mb-2'>Recommend</div>
        <div className='text-sm text-iconColor font-semibold mb-8'>Based on the content included in this playlist</div>
        {recData &&
          recData.map((item, index) => {
            return <PlaylistSearchItem key={index} data={item} />
          })}
      </div>
    </div>
  )
}
