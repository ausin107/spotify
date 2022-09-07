import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MusicSearchRow from '../../components/MusicSearchRow'
export default function Playlist() {
  const [plData, setPlData] = useState()
  const playlistData = useSelector((state) => state.search.playlistData)
  useEffect(() => {
    setPlData(playlistData)
  }, [playlistData])
  return (
    <div className='lg:pb-32 sm:pb-20 pt-32 lg:px-8 sm:px-0'>{!!plData && <MusicSearchRow musicData={plData} />}</div>
  )
}
