import { useState, useRef, useEffect } from 'react'
import { BackIcon, EmptyIcon, LogoutIcon, NextIcon, SearchIcon } from './Icon'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { logoutSuccess } from './auth/authSlice'
import { updatePLSearchData, updateSearchData } from './search/searchSlice'
import { loadSearchMusic, loadSearchPlaylists } from '../lib/loadData'
export default function Navbar() {
  const [currentHeight, setCurrentHeight] = useState()
  const [auth, setAuth] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()
  const router = useRouter()
  const navbarRef = useRef()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  useEffect(() => {
    const handleScroll = () => {
      setCurrentHeight(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    if (currentHeight >= 100) {
      navbarRef.current.classList.add('!bg-black')
    } else navbarRef.current.classList.remove('!bg-black')
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentHeight])
  useEffect(() => {
    setAuth(isAuth)
    if (
      router.pathname == '/collection' ||
      router.pathname == '/library' ||
      router.pathname == '/queue' ||
      router.pathname == '/search/playlist' ||
      router.pathname.includes('/playlists')
    ) {
      navbarRef.current.classList.add('bg-transparent')
      navbarRef.current.classList.remove('bg-navbarBg')
    } else {
      navbarRef.current.classList.add('bg-navbarBg')
      navbarRef.current.classList.remove('bg-transparent')
    }
  }, [router.pathname])
  const handleLogout = () => {
    dispatch(logoutSuccess())
    window.localStorage.removeItem('authKey')
    router.reload()
  }
  const handleSumbit = async () => {
    // const musicData = await loadSearchMusic(inputValue, 50, '')
    // dispatch(updateSearchData({ musicData: musicData.items }))
    // const plData = await loadSearchPlaylists(inputValue, 12)
    dispatch(
      updatePLSearchData({
        playlistData: [
          {
            kind: 'youtube#searchResult',
            etag: '4OZDOqPZOVX11DPILw_IodvxP0k',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLH_v4r_pvudVUnAdVijtRDfsgPOQsFK4b',
            },
            snippet: {
              publishedAt: '2018-02-21T12:55:59Z',
              channelId: 'UCWu91J5KWEj1bQhCBuGeJxw',
              title: 'Đen - New Music',
              description:
                'Ca khúc mới nhất Mang Tiền Về Cho Mẹ cùng những bài Rap khác từ Đen Vâu. Download/Stream: https://denvau.lnk.to/AMNK ...',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/JxBnLmCOEJ8/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/JxBnLmCOEJ8/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/JxBnLmCOEJ8/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Đen Vâu Official',
              liveBroadcastContent: 'none',
              publishTime: '2018-02-21T12:55:59Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '95nYOqrZkUEquPXC-crcAuoAe4E',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLH_v4r_pvudV5ZrNx9HldKLICIjUSCRLb',
            },
            snippet: {
              publishedAt: '2018-01-28T05:43:13Z',
              channelId: 'UCWu91J5KWEj1bQhCBuGeJxw',
              title: 'Đen - Official Music Videos',
              description:
                'Ca khúc mới nhất "Ai muốn nghe không" cùng những bài Rap khác từ Đen Vâu. Download/Stream: https://denvau.lnk.to/AMNK ...',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/JxBnLmCOEJ8/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/JxBnLmCOEJ8/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/JxBnLmCOEJ8/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Đen Vâu Official',
              liveBroadcastContent: 'none',
              publishTime: '2018-01-28T05:43:13Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'pYB4mx-C58BAQgYLW8XFMw-FxIQ',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLmkCJ0uTT0mvcfzXlqunDFqguhvu2HDRY',
            },
            snippet: {
              publishedAt: '2021-01-04T04:21:45Z',
              channelId: 'UCx9ZiaIcQqBqkFaFUQjI28Q',
              title: 'Đen Vâu | Đi Về Nhà | Music 1 Hour | Tuyển Tập Nhạc Hay Nhất Của Đen Vâu',
              description: '',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/vTJdVE_gjI0/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/vTJdVE_gjI0/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/vTJdVE_gjI0/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Dragonolos Sosa',
              liveBroadcastContent: 'none',
              publishTime: '2021-01-04T04:21:45Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'KlZFhE0lPmqtsCeXmkU11Kfc7qo',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLyUe7kl4fhaD4_VkaCxz2aEC8ccnL3uGZ',
            },
            snippet: {
              publishedAt: '2018-12-03T18:02:38Z',
              channelId: 'UCARz-NH1NBnoSQnffKmBSyA',
              title: 'Black Music',
              description: '',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/gUr4qp6YGLs/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/gUr4qp6YGLs/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/gUr4qp6YGLs/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Du Thanh Nguyen',
              liveBroadcastContent: 'none',
              publishTime: '2018-12-03T18:02:38Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'Z8gX90uBDUhmknFQNkEGkblW4Tc',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLZia3FscCrjaUOqxX6J-osgGkeCCPQaI9',
            },
            snippet: {
              publishedAt: '2020-02-02T09:04:02Z',
              channelId: 'UCuDiN-GYkIhmiVh2dTnIKrA',
              title: 'Đen Vâu Music',
              description: '',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/CPkGTSW34_I/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/CPkGTSW34_I/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/CPkGTSW34_I/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Trần Trung Kiên',
              liveBroadcastContent: 'none',
              publishTime: '2020-02-02T09:04:02Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'Kci-lYltULhsHxLzx57vtdOo1C8',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLDtTcQ-ptNMCC0R6OQl5fZuwKU3y3ux_z',
            },
            snippet: {
              publishedAt: '2019-03-09T12:41:01Z',
              channelId: 'UCRQievhdy4cAy_Ha_RR-YCQ',
              title: '[ MUSIC ] BLACK BERRY',
              description: '',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/Z9lKN_X152Q/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/Z9lKN_X152Q/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/Z9lKN_X152Q/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Yến Hương',
              liveBroadcastContent: 'none',
              publishTime: '2019-03-09T12:41:01Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'PMNqEzdGpgjZJu5-ke4cnFgxCEw',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PL-m6fj5EGB2frTLOqRgr-h8Etxphuwsdp',
            },
            snippet: {
              publishedAt: '2019-06-06T17:58:15Z',
              channelId: 'UCJe86PrCGhfD_cA0Et1AMJw',
              title: 'Mỹ đen Music',
              description: '',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/DeuAP04dknk/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/DeuAP04dknk/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/DeuAP04dknk/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Lil Wang',
              liveBroadcastContent: 'none',
              publishTime: '2019-06-06T17:58:15Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '-ZdZLFQ8nufu-eR7XfkdBGsWRbw',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLAVIzzroKCVIsoS-7BuwFkOec4oyQmWxG',
            },
            snippet: {
              publishedAt: '2020-11-29T14:52:43Z',
              channelId: 'UCERXCAW3vMTiTRcD3k-NUaw',
              title: 'Black Screen - Music &amp; Sounds for night with black screen on smartphone, tablet &amp; pc',
              description:
                'Black Screen - Music & Sounds for night with black screen on smartphone, tablet & pc. You can hear music & sounds during night ...',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/_M2zsqOdCRg/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/_M2zsqOdCRg/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/_M2zsqOdCRg/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Carmine Luise',
              liveBroadcastContent: 'none',
              publishTime: '2020-11-29T14:52:43Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'vs4fLlT9v60s_RcHF7b2rbGdrMQ',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLGyebwHY_zatcuj-5bmeCf2dfXJlgI-7C',
            },
            snippet: {
              publishedAt: '2018-09-13T02:07:21Z',
              channelId: 'UCGzanTz_rGDNDF7Dn8aUdmw',
              title: 'Black-screen Music - Save Battery |  Nhạc nền đen tiết kiệm pin cho điện thoại, máy tính bảng',
              description: '',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/OKUYX7rn-Sw/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/OKUYX7rn-Sw/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/OKUYX7rn-Sw/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Sky LaLa',
              liveBroadcastContent: 'none',
              publishTime: '2018-09-13T02:07:21Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'FwA2ejsXHaCqI96d7Q2EtenNXNg',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLHQ7hgSigIjfJ7SVmcAIf-lTxQQ42Gzyj',
            },
            snippet: {
              publishedAt: '2022-04-13T11:24:30Z',
              channelId: 'UCoaZjZZMz96vmbCoTTkrAvQ',
              title: 'Măng Đen live music concert #1',
              description: '',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/UEB7hGXIayA/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/UEB7hGXIayA/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/UEB7hGXIayA/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Măng Đen hoang dã',
              liveBroadcastContent: 'none',
              publishTime: '2022-04-13T11:24:30Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '-HBidaKAOPxeAov8M0xJ7Cl6fNs',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLmNIyN4pznzpsg9zhd70UDjMUHvEE374A',
            },
            snippet: {
              publishedAt: '2022-07-26T06:46:42Z',
              channelId: 'UCw2UubPdpmMCm8v0x_0aD8g',
              title: 'Hoàng Thuỳ Linh  ĐEN - Gieo Quẻ (Casting Coins) | Official Music Video',
              description:
                'nhất nam dương, nhất nam dương giá bao nhiêu, nhất nam dương mua ở đâu, thuốc nhất nam dương có tốt không, giá thuốc ...',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/nn75MEdQK3M/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/nn75MEdQK3M/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/nn75MEdQK3M/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'jackey j',
              liveBroadcastContent: 'none',
              publishTime: '2022-07-26T06:46:42Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'vG3f8bQE3TPWvJ9U770PL6p5JS0',
            id: {
              kind: 'youtube#playlist',
              playlistId: 'PLU_XszIvMGsSQdho0-w42DrzbE2EdVCa9',
            },
            snippet: {
              publishedAt: '2022-07-29T06:55:59Z',
              channelId: 'UC3QF15iPb5uR45vrjdwG9qw',
              title: 'Hoàng Thuỳ Linh  ĐEN - Gieo Quẻ (Casting Coins) | Official Music Video',
              description:
                'nhất nam dương, nhất nam dương giá bao nhiêu, nhất nam dương mua ở đâu, thuốc nhất nam dương có tốt không, giá thuốc ...',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/nn75MEdQK3M/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/nn75MEdQK3M/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/nn75MEdQK3M/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'van van',
              liveBroadcastContent: 'none',
              publishTime: '2022-07-29T06:55:59Z',
            },
          },
        ],
      })
    )
    router.push('/search/playlists')
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
    <div
      ref={navbarRef}
      className='bg-navbarBg flex flex-row h-16 w-10/12 fixed left-[16.666%] justify-between items-center z-20 transition-all duration-500 select-none'>
      <div className='flex items-center ml-8'>
        <div
          className='bg-black opacity-70 py-1 px-1 mr-4 rounded-full cursor-pointer'
          onClick={() => {
            window.history.back()
          }}>
          <BackIcon className='fill-white' />
        </div>
        <div
          className='bg-black opacity-70 py-1 px-1 mr-4 rounded-full cursor-pointer'
          onClick={() => {
            window.history.forward()
          }}>
          <NextIcon className='fill-white' />
        </div>
        {router.pathname.includes('/search') ? (
          <div className='flex items-center'>
            <div className='w-[22rem] bg-white rounded flex py-2 px-3 mr-2'>
              <SearchIcon height='24' width='24' className='fill-bgColor mr-2' />
              <input
                value={inputValue}
                placeholder='Type music name...'
                className='w-80 outline-none font-semibold'
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
                ref={inputRef}
              />
              <EmptyIcon className='fill-bgColor cursor-pointer' width='24' height='24' onClick={handleClear} />
            </div>
            <button
              onClick={handleSumbit}
              className='w-[4.5rem] h-10 bg-activeIcon hover:bg-activeIconHover hover:scale-105 rounded font-semibold'>
              Search
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      {auth ? (
        <div className='flex'>
          <div
            onClick={() => router.push('https://github.com/ausin107/spotify')}
            className='text-white font-bold border mr-6 border-white p-2 rounded-full hover:scale-105 hover:bg-black cursor-pointer'>
            Give me a star
          </div>
          <div
            onClick={handleLogout}
            className='text-white bg-logoutBg font-bold p-2 px-4 rounded-full hover:scale-105 cursor-pointer flex items-center justify-center mr-8'>
            <LogoutIcon width='16' height='16' className='mr-2' />
            Logout
          </div>
        </div>
      ) : (
        <div className='flex items-center'>
          <div
            onClick={() => router.push('https://github.com/ausin107/spotify')}
            className='text-white font-bold border mr-6 border-white p-2 rounded-full hover:scale-105 hover:bg-black cursor-pointer'>
            Give me a star
          </div>
          <div
            className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'
            onClick={() => router.push('https://www.spotify.com/vn-vi/download/windows/')}>
            Download
          </div>
          <div className='mr-7 border-l-[1px] border-white py-3'></div>
          <div
            className='text-navbarColor text-lg font-semibold mr-7 tracking-wide hover:text-white hover:scale-105 cursor-pointer'
            onClick={() => router.push('/signup')}>
            Register
          </div>
          <div
            className='text-black text-lg font-semibold mr-7 tracking-wide hover:scale-105 cursor-pointer bg-white p-2 px-6 rounded-full'
            onClick={() => router.push('/login')}>
            Login
          </div>
        </div>
      )}
    </div>
  )
}
