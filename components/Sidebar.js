import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  SpotifyLogo,
  HomeIcon,
  HomeIconActive,
  SearchIcon,
  SearchIconActive,
  LibraryIcon,
  LibraryIconActive,
  PlusIcon,
  LoveIcon,
} from '../components/Icon'
import Link from 'next/link'
import PlaylistsSidebar from './PlaylistsSidebar'
import { addMusicToPlayList, getAllPlaylistsInfo } from '../lib/firebaseAction'
import { loadAllPlaylist } from './playlists/playlistSlice'
import { loadAllExtPlaylists } from './extPlaylists/extPlaylistsSlice'
import { setShow } from './toast/toastSlice'
export default function Sidebar() {
  const [playlists, setPlaylists] = useState('')
  const [extPlaylists, setExtPlaylists] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuth, authKey } = useSelector((state) => state.auth)
  const allPlaylist = useSelector((state) => state.playlist.allPlaylist)
  const allExtPlaylist = useSelector((state) => state.extplaylist.allExtPlaylist)
  const bannerRef = useRef([])
  const linkRef = useRef([])
  const hanldeAuth = async (bannerId, path) => {
    if (isAuth) {
      if (path == '/playlists') {
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
        setPlaylists(newPlaylist)
        dispatch(loadAllPlaylist(newPlaylist))
        router.push(`/playlists/${playlistId}`)
        dispatch(setShow('Created new playlist to library'))
      } else {
        router.push(path)
      }
    } else {
      bannerRef.current.map((item, index) => {
        if (index == bannerId) {
          item.classList.toggle('hiddenBanner')
        } else {
          item.classList.add('hiddenBanner')
        }
      })
    }
  }
  useEffect(() => {
    const pathName = ['/', '/search', '/library', '/playlist', '/collection']
    for (let x in pathName) {
      linkRef.current[x].classList.remove('!text-white')
      if (pathName[x] == router.pathname) {
        linkRef.current[x].classList.add('!text-white')
      } else if (pathName[x] == '/search' && router.pathname.includes('search')) {
        linkRef.current[x].classList.add('!text-white')
      }
    }
  }, [router.pathname])
  useEffect(() => {
    const getAllPlaylists = async () => {
      const playlists = await getAllPlaylistsInfo(`collection/${authKey}/playlists`)
      setPlaylists(playlists)
      const extplaylists = await getAllPlaylistsInfo(`collection/${authKey}/extplaylists`)
      setExtPlaylists(extplaylists)
    }
    getAllPlaylists()
  }, [allPlaylist, allExtPlaylist])
  useEffect(() => {
    const getAllPlaylists = async () => {
      const playlists = await getAllPlaylistsInfo(`collection/${authKey}/playlists`)
      dispatch(loadAllPlaylist(playlists))
      const extplaylists = await getAllPlaylistsInfo(`collection/${authKey}/extplaylists`)
      dispatch(loadAllExtPlaylists(extplaylists))
    }
    getAllPlaylists()
  }, [])
  return (
    <div className='bg-black fixed h-screen lg:w-2/12 hidden lg:block z-20'>
      <div className='pt-6 pb-4 mb-4 border-b mx-6 border-itemActiveBg'>
        <SpotifyLogo
          onClick={() => router.push('/')}
          className='text-white text-sm w-[60%] sm:mb-8 hover:cursor-pointer'
        />
        <div className='mb-8'>
          <Link href='/'>
            <div
              className='text-iconColor mb-4 flex font-semibold icon-class'
              onMouseDown={(el) => el.target.classList.add('!font-normal')}
              onMouseUp={(el) => el.target.classList.remove('!font-normal')}
              ref={(el) => (linkRef.current[0] = el)}>
              {router.pathname == '/' ? (
                <HomeIconActive className='fill-white mr-4' />
              ) : (
                <HomeIcon className='fill-iconColor mr-4 font-semibold' />
              )}
              Home page
            </div>
          </Link>
          <Link href='/search'>
            <div
              className='text-iconColor mb-4 flex font-semibold icon-class'
              ref={(el) => (linkRef.current[1] = el)}
              onMouseDown={(el) => el.target.classList.add('!font-normal')}
              onMouseUp={(el) => el.target.classList.remove('!font-normal')}>
              {router.pathname.includes('search') ? (
                <SearchIconActive className='fill-white mr-4' />
              ) : (
                <SearchIcon height='24' width='24' className='fill-iconColor mr-4 font-semibold ' />
              )}
              Search
            </div>
          </Link>
          <div className='relative'>
            <div
              onClick={() => hanldeAuth(0, '/library')}
              className='text-iconColor mb-4 flex font-semibold icon-class'
              ref={(el) => (linkRef.current[2] = el)}
              onMouseDown={(el) => el.target.classList.add('!font-normal')}
              onMouseUp={(el) => el.target.classList.remove('!font-normal')}>
              {router.pathname == '/library' ? (
                <LibraryIconActive className='fill-white mr-4' />
              ) : (
                <LibraryIcon className='fill-iconColor mr-4 font-semibold' />
              )}
              Library
            </div>
            <div
              ref={(el) => (bannerRef.current[0] = el)}
              className='p-4 rounded-md z-10 bg-banner2LoginBg w-80 absolute -top-4 left-32 transition-all duration-500 opacity-100 hiddenBanner'>
              <div className='text-white text-xl mb-3 font-bold'>Enjoy your Library</div>
              <div className='text-white mb-6 font-semibold'>
                Login to watch your playlist, video and create awesome playlists.
              </div>
              <div className='flex justify-end items-center'>
                <div className='text-white hover:scale-105 font-bold mr-4 cursor-pointer' onClick={() => hanldeAuth(0)}>
                  Later
                </div>
                <Link href='/login'>
                  <div className='text-black hover:scale-105 font-bold bg-white py-3 px-8 rounded-full flex items-center justify-center cursor-pointer'>
                    Login
                  </div>
                </Link>
              </div>
              <div className='triangle'></div>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='relative'>
            <div
              onClick={() => hanldeAuth(1, '/playlists')}
              className='flex text-iconColor mb-4 font-semibold items-center icon-class'
              ref={(el) => (linkRef.current[3] = el)}>
              <div className='bg-iconColor mr-4 p-[0.4rem] rounded icon-bg'>
                <PlusIcon width='12' height='12' className='fill-black' />
              </div>
              Create playlist
            </div>
            <div
              ref={(el) => (bannerRef.current[1] = el)}
              className='p-4 rounded-md z-10 bg-banner2LoginBg w-80 absolute -top-4 left-44 transition-all duration-500 opacity-100 hiddenBanner'>
              <div className='text-white text-xl mb-3 font-bold'>Enjoy your Library</div>
              <div className='text-white mb-6 font-semibold'>
                Login to watch your playlist, video and create awesome playlists.
              </div>
              <div className='flex justify-end items-center'>
                <div className='text-white hover:scale-105 font-bold mr-4 cursor-pointer' onClick={() => hanldeAuth(1)}>
                  Later
                </div>
                <Link href='/login'>
                  <div className='text-black hover:scale-105 font-bold bg-white py-3 px-8 rounded-full flex items-center justify-center cursor-pointer'>
                    Login
                  </div>
                </Link>
              </div>
              <div className='triangle'></div>
            </div>
          </div>
          <div className='relative'>
            <div
              onClick={() => hanldeAuth(2, '/collection')}
              className='flex text-iconColor font-semibold items-center icon-class'
              ref={(el) => (linkRef.current[4] = el)}>
              <div className='bg-loveIconBg mr-4 p-[0.4rem] rounded'>
                {router.pathname == '/collection' ? (
                  <LoveIcon className='fill-white' />
                ) : (
                  <LoveIcon className='fill-iconColor' />
                )}
              </div>
              Favorite song
            </div>
            <div
              ref={(el) => (bannerRef.current[2] = el)}
              className='p-4 rounded-md z-10 bg-banner2LoginBg w-80 absolute -top-4 left-44 transition-all duration-500 opacity-100 hiddenBanner'>
              <div className='text-white text-xl mb-3 font-bold'>Enjoy your Library</div>
              <div className='text-white mb-6 font-semibold'>
                Login to watch your playlist, video and create awesome playlists.
              </div>
              <div className='flex justify-end items-center'>
                <div className='text-white hover:scale-105 font-bold mr-4 cursor-pointer' onClick={() => hanldeAuth(2)}>
                  Later
                </div>
                <Link href='/login'>
                  <div className='text-black hover:scale-105 font-bold bg-white py-3 px-8 rounded-full flex items-center justify-center cursor-pointer'>
                    Login
                  </div>
                </Link>
              </div>
              <div className='triangle'></div>
            </div>
          </div>
        </div>
      </div>
      {!!playlists && <PlaylistsSidebar allPlaylists={playlists} path='/playlists/' />}
      {!!extPlaylists && <PlaylistsSidebar allPlaylists={extPlaylists} path='/extplaylists/' />}
    </div>
  )
}
