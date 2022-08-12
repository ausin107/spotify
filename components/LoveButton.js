import { useState, useEffect } from 'react'
import { LoveMusicActive, LoveMusic } from './Icon'
import { useSelector, useDispatch } from 'react-redux'
import { addCollection, deleteCollection, getCollection } from './collection/collectionAction'
import { loadItemsSuccess } from './collection/collectionSlice'
export default function LoveButton({ musicId, musicData }) {
  const [isLoved, setLoved] = useState(false)
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const authKey = useSelector((state) => state.auth.authKey)
  const handleLoveMusic = async () => {
    if (isAuth) {
      if (isLoved) {
        dispatch(deleteCollection(`collection/${authKey}/items/${musicId}`))
        dispatch(getCollection(`collection/${authKey}/items`))
        setLoved(false)
      } else {
        dispatch(addCollection(`collection/${authKey}/items/${musicId}`, musicData))
        dispatch(getCollection(`collection/${authKey}/items`))
        setLoved(true)
      }
    } else {
      alert('Please Login !!')
    }
  }
  return (
    <div onClick={handleLoveMusic}>
      {isLoved ? (
        <LoveMusicActive
          className='fill-activeIcon hover:fill-activeIconHover mr-4 cursor-pointer'
          width='16'
          height='16'
        />
      ) : (
        <LoveMusic
          className='fill-musicPlayer hover:fill-white mr-4 cursor-pointer'
          width='16'
          height='16'
        />
      )}
    </div>
  )
}
