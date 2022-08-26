import { useEffect, useState } from 'react'
import PlaylistsBody from '../../components/PlaylistsBody'
import SearchPageLayout from '../../components/SearchPageLayout'
import { useSelector } from 'react-redux'
import MusicsList from '../../components/MusicsList'
export default function Musics() {
  const [searchData, setSearchData] = useState()
  let musicData = useSelector((state) => state.search.musicData)

  useEffect(() => {
    setSearchData(musicData)
  }, [musicData])
  return (
    <div className='left-[16.666%] w-[82vw] overflow-hidden h-full relative bg-bgColor pb-32 pt-32 px-8'>
      {searchData?.length > 0 && <MusicsList data={searchData} />}
    </div>
  )
}
Musics.getLayout = (page) => <SearchPageLayout>{page}</SearchPageLayout>
