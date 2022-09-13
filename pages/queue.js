import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PlayListItem from '../components/PlayListItem'
import { Playlists } from '../components/Icon'
export default function Queue() {
  const [playingMs, setPlayingMs] = useState()
  const [waitingMs, setWaitingMs] = useState([])
  const { allMusics, currentMsId } = useSelector((state) => state.collection.items)
  useEffect(() => {
    let waitingList = []
    allMusics.map((item, index) => {
      if (index == currentMsId) {
        setPlayingMs(item)
      } else if (index > currentMsId) {
        waitingList = [...waitingList, item]
      }
    })
    setWaitingMs(waitingList)
  }, [allMusics, currentMsId])
  return (
    <>
      {!!playingMs && !!waitingMs ? (
        <div className='pt-28 pb-48 px-9 flex flex-col border-b border-searchChildBg mb-28'>
          <div className='text-white text-2xl font-bold mb-6'>Waiting list</div>
          <div className='mb-6'>
            <div className='text-iconColor font-semibold mb-2'>Now playing</div>
            <PlayListItem data={playingMs} index={0} />
          </div>
          <div className='mb-6'>
            <div className='text-iconColor font-semibold mb-2'>Next Musics</div>
            {waitingMs.map((item, index) => {
              return <PlayListItem key={index} data={item} index={index + 1} />
            })}
          </div>
        </div>
      ) : (
        <div className='pt-48 pb-48 px-9 flex flex-col border-b border-searchChildBg mb-28 items-center'>
          <Playlists width='56' height='56' className='fill-musicPlayer mb-6' />
          <div className='text-white text-3xl font-bold mb-6'>Add to waiting list</div>
          <div className='text-iconColor font-semibold mb-6'>
            Click "Add to waitlist" from a post's menu to include it here
          </div>
          <button className='text-black font-bold py-3 px-8 bg-white rounded-full hover:scale-105'>
            Find Music Now
          </button>
        </div>
      )}
    </>
  )
}
