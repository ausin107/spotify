import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux/es/exports'
export default function SearchNavBar() {
  const router = useRouter()
  const itemsRef = useRef([])
  const musicData = useSelector((state) => state.search.musicData)
  useEffect(() => {
    const items = ['/search', '/search/playlists', '/search/musics', '/search/artists']
    itemsRef.current.map((item) => {
      item.classList.remove('!text-black', '!bg-white')
    })
    items.map((item, index) => {
      if (item == router.pathname) {
        itemsRef.current[index]?.classList.add('!text-black', '!bg-white')
      }
    })
  }, [router.pathname, musicData])
  return (
    <>
      {!!musicData && (
        <div className='bg-bgColor flex flex-row h-12 w-10/12 fixed left-[16.666%] top-16 px-8 items-center z-20 transition-all duration-500 select-none'>
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
            onClick={() => router.push('/search')}
            className='text-white font-semibold rounded-full bg-searchNavbarItem px-3 py-1 mr-3 cursor-pointer hover:bg-hoverSearchItem'>
            Artist
          </div>
        </div>
      )}
    </>
  )
}
