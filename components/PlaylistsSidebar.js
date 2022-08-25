import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { addMusicToPlayList, getPlaylist } from '../lib/firebaseAction'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function PlaylistsSidebar({ allPlaylists }) {
  const router = useRouter()
  const playlistRef = useRef([])
  useEffect(() => {
    allPlaylists.map((item, index) => {
      playlistRef.current[index].classList.remove('!text-white')
      if (item.playListId == router.query.id) {
        playlistRef.current[index].classList.add('!text-white')
      }
    })
  }, [router.query.id])
  return (
    <div className='flex'>
      <div className='border-t border-itemActiveBg text-white w-full mx-6 py-4'>
        {allPlaylists.map((item, index) => {
          return (
            <Link key={item.playListId} href={'/playlists/' + item.playListId}>
              <div
                className='text-iconColor font-semibold mb-2 cursor-pointer icon-class'
                ref={(el) => (playlistRef.current[index] = el)}>
                {item.title}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
