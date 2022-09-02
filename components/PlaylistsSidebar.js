import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function PlaylistsSidebar({ allPlaylists, path }) {
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
      <div className='text-white w-full mx-6'>
        {allPlaylists.map((item, index) => {
          const plTitle = item.title.length > 25 ? item.title.slice(0, 25) + '...' : item.title
          return (
            <Link key={item.playListId} href={path + item.playListId}>
              <div
                className='text-iconColor font-semibold mb-2 cursor-pointer icon-class'
                ref={(el) => (playlistRef.current[index] = el)}>
                {plTitle}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
