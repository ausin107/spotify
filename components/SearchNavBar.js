import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { SearchIcon, EmptyIcon } from './Icon'
import { loadSearchMusic, loadSearchPlaylists, loadAllMusicArtics } from '../lib/loadData'
import { updatePLSearchData, updateSearchData, updateArtiscData, startLoading, endLoading } from './search/searchSlice'
export default function SearchNavBar() {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const musicData = useSelector((state) => state.search.musicData)
  const router = useRouter()
  const itemsRef = useRef([])
  const navbarRef = useRef()
  const inputRef = useRef()
  const handleSumbit = async () => {
    dispatch(startLoading())
    const musicData = await loadSearchMusic(inputValue, 50, '')
    dispatch(updateSearchData({ musicData: musicData.items }))
    const plData = await loadSearchPlaylists(inputValue, 15)
    dispatch(updatePLSearchData({ playlistData: plData.items }))
    const artistsId = musicData.items.map((item) => {
      return item.snippet.channelId
    })
    const allArtistData = await loadAllMusicArtics(artistsId)
    dispatch(updateArtiscData({ actistsData: allArtistData }))
    dispatch(endLoading())
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
  useEffect(() => {
    if (router.pathname.includes('search')) {
      const items = ['/search', '/search/playlists', '/search/musics', '/search/artists']
      itemsRef.current.map((item) => {
        item?.classList.remove('!text-black', 'lg:!bg-white', '!bg-activeIconHover')
      })
      items.map((item, index) => {
        if (item == router.pathname) {
          itemsRef.current[index]?.classList.add('!text-black', 'lg:!bg-white', '!bg-activeIconHover')
          navbarRef?.current?.classList.remove('hidden')
        }
      })
    }
  }, [router.pathname, musicData])
  return (
    <>
      {router.pathname.includes('search') && router.pathname != '/search/playlist' && (
        <div className='flex fixed z-30 w-full lg:hidden items-center'>
          <div className='w-full bg-inputPlBorder flex py-3 px-3'>
            <SearchIcon height='24' width='24' className='fill-white mr-3' />
            <input
              value={inputValue}
              placeholder='Type music name...'
              className='w-full outline-none font-semibold text-white bg-inputPlBorder'
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => handleEnter(e)}
              ref={inputRef}
            />
            <EmptyIcon className='fill-white' width='24' height='24' onClick={handleClear} />
          </div>
        </div>
      )}
      {!!musicData && router.pathname.includes('search') && router.pathname != '/search/playlist' && (
        <div className='bg-bgColor flex flex-row lg:h-12 h-14 lg:w-10/12 w-full fixed lg:left-[16.666%] lg:top-16 top-12 lg:px-8 px-4 items-center z-20 transition-all duration-500'>
          <div
            ref={(el) => (itemsRef.current[0] = el)}
            onClick={() => router.push('/search')}
            className='text-white font-semibold rounded-full bg-searchNavbarItem px-3 py-1 mr-3 cursor-pointer hover:bg-hoverSearchItem'>
            All Result
          </div>
          <div
            ref={(el) => (itemsRef.current[1] = el)}
            onClick={() => router.push('/search/playlists')}
            className='text-white font-semibold rounded-full bg-searchNavbarItem px-3 py-1 mr-3 cursor-pointer hover:bg-hoverSearchItem'>
            Playlists
          </div>
          <div
            ref={(el) => (itemsRef.current[2] = el)}
            onClick={() => router.push('/search/musics')}
            className='text-white font-semibold rounded-full bg-searchNavbarItem px-3 py-1 mr-3 cursor-pointer hover:bg-hoverSearchItem'>
            Musics
          </div>
          <div
            ref={(el) => (itemsRef.current[3] = el)}
            onClick={() => router.push('/search/artists')}
            className='text-white font-semibold rounded-full bg-searchNavbarItem px-3 py-1 mr-3 cursor-pointer hover:bg-hoverSearchItem'>
            Artist
          </div>
        </div>
      )}
    </>
  )
}
