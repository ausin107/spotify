import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setEnded, showMusicPlayer } from '../../components/music_player/musicPlayerSlice'
import { getAllPlaylistMusics } from '../../lib/firebaseAction'
import { SearchIcon, EmptyIcon, MusicIconV2 } from '../../components/Icon'
import { loadSearchMusic } from '../../lib/loadData'
import { setCurrentPlayList } from '../../components/collection/collectionSlice'
import PlaylistSearchItem from '../../components/PlaylistSearchItem'
import PlaylistsBody from '../../components/PlaylistsBody'
export default function PlayList() {
  const [data, setData] = useState('')
  const [searchData, setSearchData] = useState([
    {
      kind: 'youtube#searchResult',
      etag: 'k7dMeVHMmi8pF4Gj8N9GlCnxuLw',
      id: {
        kind: 'youtube#video',
        videoId: 'Bhg-Gw953b0',
      },
      snippet: {
        publishedAt: '2020-09-22T12:00:10Z',
        channelId: 'UChUJa1JyBc7Lc4orkiNKKQg',
        title: 'Jack | Hoa Hải Đường | Official Music Video',
        description:
          'Jack #HoaHaiDuong #J97 #VieNetwork Jack | Hoa Hải Đường | Official Music Video --- Đón nghe "Hoa Hải Đường" trên: Spotify: ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/Bhg-Gw953b0/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/Bhg-Gw953b0/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/Bhg-Gw953b0/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'J97',
        liveBroadcastContent: 'none',
        publishTime: '2020-09-22T12:00:10Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'D9awmkqegUH21Wg5r5poovUErWU',
      id: {
        kind: 'youtube#video',
        videoId: 'W6hxiDmMGSE',
      },
      snippet: {
        publishedAt: '2016-12-23T06:11:57Z',
        channelId: 'UCREZ_2DVoSpPNojd342aSWw',
        title: 'Đường Một Chiều - Huỳnh Tú ft. Magazine || Official Music Video',
        description:
          'Đường Một Chiều - Huỳnh Tú ft. Magazine Download/Stream : https://88Music.lnk.to/DMC Sáng tác : Nam Trương Videographer: ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/W6hxiDmMGSE/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/W6hxiDmMGSE/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/W6hxiDmMGSE/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'Tú Huỳnh',
        liveBroadcastContent: 'none',
        publishTime: '2016-12-23T06:11:57Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'DZvB1lMJJgHq_CqdF5gxeBg94cA',
      id: {
        kind: 'youtube#video',
        videoId: 'wDqln691Zbw',
      },
      snippet: {
        publishedAt: '2017-04-02T02:28:47Z',
        channelId: 'UCBZGP9UDDe9kVnLWTeBZu6w',
        title: 'Đường Tím Bằng Lăng - Thiên Quang ft Quỳnh Trang',
        description:
          'Đường Tím Bằng Lăng Sáng Tác : Hoài Yên Ca Sĩ : Thiên Quang ft Quỳnh Trang Thu âm & mix : Võ Hoàng Studio Hòa âm : Đức ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/wDqln691Zbw/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/wDqln691Zbw/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/wDqln691Zbw/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'Bolero Ngôi Sao Trẻ',
        liveBroadcastContent: 'none',
        publishTime: '2017-04-02T02:28:47Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'M-cQdoo0wd9eSvdZ75L5xf1vFLI',
      id: {
        kind: 'youtube#video',
        videoId: 'VCN8HGdYmLM',
      },
      snippet: {
        publishedAt: '2017-03-12T20:24:08Z',
        channelId: 'UC7nMrW3baKp0dA5Tz9ulVYQ',
        title: 'Như Quỳnh &amp; Trường Vũ - LK Con Đường Xưa Em Đi &amp; Xin Anh Giữ Trọn Tình Quê / PBN 77',
        description:
          'nhuquynh #truongvu #thuynga Như Quỳnh & Trường Vũ - LK Con Đường Xưa Em Đi (Châu Kỳ & Hồ Đình Phương) & Xin Anh ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/VCN8HGdYmLM/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/VCN8HGdYmLM/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/VCN8HGdYmLM/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'Thuy Nga',
        liveBroadcastContent: 'none',
        publishTime: '2017-03-12T20:24:08Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: '2A7bz5L36i3-xi19BOceOljo294',
      id: {
        kind: 'youtube#video',
        videoId: '1NywJvNpgAI',
      },
      snippet: {
        publishedAt: '2021-05-31T12:30:01Z',
        channelId: 'UC_2xOulfOUHbBR-sty6psZQ',
        title: 'Đường Tôi Chở Em Về - Buitruonglinh「Cukak Remix」/ Audio Lyrics',
        description:
          'Đường Tôi Chở Em Về - Buitruonglinh「Cukak Remix」/ Audio Lyrics • Prod. by CUKAK ♬ Mp3: https://bom.to/ILC0123Ggrl0Yx ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/1NywJvNpgAI/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/1NywJvNpgAI/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/1NywJvNpgAI/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'CUKAK',
        liveBroadcastContent: 'none',
        publishTime: '2021-05-31T12:30:01Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'tzbVLnDXniIScjrDRvvOZwc3um8',
      id: {
        kind: 'youtube#video',
        videoId: 'KYSAodQWADo',
      },
      snippet: {
        publishedAt: '2020-11-28T11:30:12Z',
        channelId: 'UC73Ijc3FQ4v18k1QjHO2bJA',
        title: 'ĐƯỜNG QUYỀN TÌNH YÊU | DatKaa x HERO TEAM x QT Beatz | Parody  Cover [Official Music Video]',
        description:
          'ĐƯỜNG QUYỀN TÌNH YÊU | DatKaa x HERO TEAM x QT Beatz | Parody Cover [Official Music Video] #datkaa #heroteam #dqty ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/KYSAodQWADo/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/KYSAodQWADo/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/KYSAodQWADo/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'Mister Vit',
        liveBroadcastContent: 'none',
        publishTime: '2020-11-28T11:30:12Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: '5zbEmL-EGo4qeW8gpE3ksLAxn_E',
      id: {
        kind: 'youtube#video',
        videoId: 'LImkI9UvJCY',
      },
      snippet: {
        publishedAt: '2021-02-25T13:00:14Z',
        channelId: 'UCqamjdcGALEjPreSrxwK9IQ',
        title: 'CAFE KHÔNG ĐƯỜNG || JOMBIE x TKAN &amp; BEAN || OFFICIAL MUSIC VIDEO',
        description:
          'CAFE KHÔNG ĐƯỜNG || JOMBIE x TKAN & BEAN || OFFICIAL MUSIC VIDEO ▻SUBSCRIBE CHANNEL: https://bit.ly/G5RSquad ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/LImkI9UvJCY/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/LImkI9UvJCY/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/LImkI9UvJCY/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'G5R SQUAD Official',
        liveBroadcastContent: 'none',
        publishTime: '2021-02-25T13:00:14Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'e2bqcjwsskZ4NnwHm-I_ckkRtAI',
      id: {
        kind: 'youtube#video',
        videoId: '6ypxNyZMJt0',
      },
      snippet: {
        publishedAt: '2020-06-14T10:15:15Z',
        channelId: 'UC4L6cAm9LPirrd6Va-8NheQ',
        title: 'ĐƯỜNG QUYỀN TÌNH YÊU - DatKaa x QT Beatz (Ness x@HOA HỒNG DẠI MUSIC OFFICIAL Remix) | Hot Tik Tok',
        description:
          'Nghe HOA HỒNG DẠI MUSIC tại ZingMP3: https://zingmp3.vn/nghe-si/HOA-HONG-DAI-MUSIC ĐƯỜNG QUYỀN TÌNH YÊU ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/6ypxNyZMJt0/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/6ypxNyZMJt0/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/6ypxNyZMJt0/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'HOA HỒNG DẠI MUSIC',
        liveBroadcastContent: 'none',
        publishTime: '2020-06-14T10:15:15Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'rBXaPWZIPwAmcouCtVyRcDC-3_o',
      id: {
        kind: 'youtube#video',
        videoId: '0CI6LpOZh2Y',
      },
      snippet: {
        publishedAt: '2014-09-15T06:50:15Z',
        channelId: 'UCUgXK2UjZ8G_EM438aYkGrw',
        title: 'Phim Ca Nhạc Đại Náo Võ Đường | Hồ Việt Trung, Hứa Minh Đạt, Trương Quý Nhi',
        description:
          'Tải ỨNG DỤNG POPS Kids để xem trọn bộ 500 tập Doraemon: https://popskids.onelink.me/X36W/DRMYT . Tải ứng dụng POPS ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/0CI6LpOZh2Y/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/0CI6LpOZh2Y/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/0CI6LpOZh2Y/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'POPS MUSIC',
        liveBroadcastContent: 'none',
        publishTime: '2014-09-15T06:50:15Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'JGppcAFyXm0CxPqxZLDqrFC0_MM',
      id: {
        kind: 'youtube#video',
        videoId: 'ZwDxaM5VBJM',
      },
      snippet: {
        publishedAt: '2019-05-09T12:58:14Z',
        channelId: 'UCSnVteUNlhr1SqCjTQx0PDQ',
        title: 'AMEE - ĐEN ĐÁ KHÔNG ĐƯỜNG | Official Music Video',
        description:
          'AMEE - ĐEN ĐÁ KHÔNG ĐƯỜNG | Official Music Video #DenDaKhongDuong #AMEE #BRAY #DDKD #MV #SummerAMEE ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/ZwDxaM5VBJM/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/ZwDxaM5VBJM/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/ZwDxaM5VBJM/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'ST.319 Entertainment',
        liveBroadcastContent: 'none',
        publishTime: '2019-05-09T12:58:14Z',
      },
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const playListId = router.query.id
  const authKey = useSelector((state) => state.auth.authKey)
  const allMusic = useSelector((state) => state.collection.items)
  const isPlayList = useSelector((state) => state.player.isPlayList)
  const currentId = useSelector((state) => state.collection.currentId)

  useEffect(() => {
    dispatch(setCurrentPlayList(playListId))
    const getPlaylist = async () => {
      const data = await getAllPlaylistMusics(`collection/${authKey}/playlists/${playListId}/items`)
      setData(data)
    }
    getPlaylist()
  }, [allMusic, playListId])
  useEffect(() => {
    if (isPlayList) {
      !!data &&
        data.map((item, index) => {
          if (index == currentId) {
            let musicId = typeof item.id == 'object' ? item.id.videoId : item.id
            const musicInfo = {
              musicData: item,
              musicId,
            }
            dispatch(showMusicPlayer(musicInfo))
            document.title = item.snippet.title
          }
        })
      dispatch(setEnded())
    }
  }, [currentId])
  const handleSumbit = async () => {
    // const musicData = await loadSearchMusic(inputValue, 10, '&order=viewCount')
    // setSearchData(musicData.items)
    // console.log(musicData.items)
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
    <div className='bg-bgColor left-[16.666%] w-[82.5vw] overflow-hidden relative'>
      <div className='pt-20 pb-48 px-9 flex bg-greyBg items-end'>
        <div className='w-60 h-60 shadow-3xl bg-itemActiveBg flex items-center justify-center'>
          <MusicIconV2 width='65' height='65' className='fill-textBreakLine' />
        </div>
        <div className='px-6'>
          <div
            className='uppercase text-white font-bold text-xs mb-2'
            style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            Playlist
          </div>
          <div className='text-white font-bold text-8xl mb-12' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            My Playlist
          </div>
          <div className='text-white text-xs font-bold' style={{ textShadow: '4px -1px 46px rgb(0 0 0 / 75%)' }}>
            User - {data.length} song
          </div>
        </div>
      </div>
      {data.length > 0 && <PlaylistsBody data={data} />}
      {!!searchData && (
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
              <EmptyIcon className='fill-iconColor' width='24' height='24' />
            </div>
          </div>
          <div className='mt-8'>
            {searchData.map((item, index) => {
              return <PlaylistSearchItem key={index} data={item} />
            })}
          </div>
        </div>
      )}
    </div>
  )
}
