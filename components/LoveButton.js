import { useState, useEffect } from 'react'
import { LoveMusicActive, LoveMusic } from './Icon'
import { useSelector, useDispatch } from 'react-redux'
import { addCollection, deleteCollection, getCollection } from './collection/collectionAction'
import { getSingleFavoriteMusic } from '../lib/firebaseAction'
import { setShow } from './toast/toastSlice'
export default function LoveButton({ musicId, musicData, className, width, height }) {
  const [isLove, setLove] = useState(false)
  const dispatch = useDispatch()
  const { currentId, items } = useSelector((state) => state.collection)
  const { isAuth, authKey } = useSelector((state) => state.auth)
  const handleLoveMusic = async (e) => {
    e.stopPropagation()
    if (isAuth) {
      if (isLove) {
        dispatch(deleteCollection(`collection/${authKey}/items/${musicId}`))
        dispatch(getCollection(`collection/${authKey}/items`, currentId))
        dispatch(setShow('Removed from your Favorite Songs'))
        setLove(false)
      } else {
        dispatch(addCollection(`collection/${authKey}/items/${musicId}`, musicData))
        dispatch(getCollection(`collection/${authKey}/items`, currentId))
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
  }, [items, musicId])
  return (
    <div onClick={(e) => handleLoveMusic(e)} className={className}>
      {isLove ? (
        <LoveMusicActive className='fill-activeIcon hover:fill-activeIconHover' width={width} height={height} />
      ) : (
        <LoveMusic className='fill-musicPlayer hover:fill-white' width={width} height={height} />
      )}
    </div>
  )
}
