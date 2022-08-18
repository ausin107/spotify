import { useState, useEffect } from 'react'
import { LoveMusicActive, LoveMusic } from './Icon'
import { useSelector, useDispatch } from 'react-redux'
import { addCollection, deleteCollection, getCollection } from './collection/collectionAction'
import { getSingleFavoriteMusic } from '../lib/firebaseAction'
import { setShow } from './toast/toastSlice'
export default function LoveButton({ musicId, musicData }) {
  const [isLove, setLove] = useState(false)
  const dispatch = useDispatch()
  const musicIdShowed = useSelector((state) => state.player.musicId)
  const isAuth = useSelector((state) => state.auth.isAuth)
  const authKey = useSelector((state) => state.auth.authKey)
  const isLoading = useSelector((state) => state.collection.isLoading)
  const handleLoveMusic = async (e) => {
    e.stopPropagation()
    if (isAuth) {
      if (isLove) {
        dispatch(deleteCollection(`collection/${authKey}/items/${musicId}`))
        dispatch(getCollection(`collection/${authKey}/items`))
        dispatch(setShow('Removed from your Favorite Songs'))
        setLove(false)
      } else {
        dispatch(addCollection(`collection/${authKey}/items/${musicId}`, musicData))
        dispatch(getCollection(`collection/${authKey}/items`))
        dispatch(setShow('Added to your Favorite Songs'))
        setLove(true)
      }
    } else {
      dispatch(setShow('Please Login First !!'))
    }
  }
  useEffect(() => {
    const getData = async () => {
      const result = await getSingleFavoriteMusic(`collection/${authKey}/items/${musicId}`)
      if (!!result) {
        setLove(true)
      } else {
        setLove(false)
      }
    }
    getData()
  }, [isLoading, musicId])
  return (
    <div onClick={(e) => handleLoveMusic(e)}>
      {isLove ? (
        <LoveMusicActive
          className='fill-activeIcon hover:fill-activeIconHover mr-4 cursor-pointer'
          width='16'
          height='16'
        />
      ) : (
        <LoveMusic className='fill-musicPlayer hover:fill-white mr-4 cursor-pointer' width='16' height='16' />
      )}
    </div>
  )
}
