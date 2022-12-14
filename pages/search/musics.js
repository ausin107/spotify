import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MusicsList from '../../components/MusicsList'
export default function Musics() {
  const [searchData, setSearchData] = useState()
  let musicData = useSelector((state) => state.search.musicData)

  useEffect(() => {
    setSearchData(musicData)
  }, [musicData])
  return <div className='pb-32 lg:px-8 px-4 pt-24'>{searchData?.length > 0 && <MusicsList data={searchData} />}</div>
}
