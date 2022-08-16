import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPlaylistsInfo, addMusicToPlayList, getPlaylist } from '../lib/firebaseAction'
import Link from 'next/link'
export default function Playlists() {
  const [playlists, setPLaylists] = useState('')
  const authKey = useSelector((state) => state.auth.authKey)
  useEffect(() => {
    const getData = async () => {
      const result = await getPlaylistsInfo(`collection/${authKey}/playlists`)
      setPLaylists(result)
    }
    getData()
  }, [])
  return (
    <div className='flex'>
      {!!playlists && (
        <div className='border-t border-itemActiveBg text-white w-full mx-6 py-4'>
          {playlists.map((item, index) => {
            return (
              <Link href={'/playlists/' + item.playListId}>
                <div key={item.playListId} className='text-iconColor font-semibold mb-2 cursor-pointer icon-class'>
                  My playlists #{index + 1}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
