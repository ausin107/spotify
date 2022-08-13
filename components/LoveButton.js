import { useState, useEffect } from 'react'
import { LoveMusicActive, LoveMusic } from './Icon'
import { useSelector, useDispatch } from 'react-redux'
import { addCollection, deleteCollection, getCollection } from './collection/collectionAction'
import { loadItemsSuccess, startLoading } from './collection/collectionSlice'
import { getSingleLikedMusic } from '../lib/firebaseAction'
export default function LoveButton({ musicId, musicData }) {
  const [isLoved, setLoved] = useState(false)
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const authKey = useSelector((state) => state.auth.authKey)
  const isLoading = useSelector((state) => state.collection.isLoading)
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
  const handleIcon = () => {
    if (!isLoading && isLoved) {
      return (
        <LoveMusicActive
          className='fill-activeIcon hover:fill-activeIconHover mr-4 cursor-pointer'
          width='16'
          height='16'
        />
      )
    } else if (!isLoading && !isLoved) {
      return <LoveMusic className='fill-musicPlayer hover:fill-white mr-4 cursor-pointer' width='16' height='16' />
    } else return ''
  }
  useEffect(() => {
    const getData = async () => {
      dispatch(startLoading())
      const result = await getSingleLikedMusic(`collection/${authKey}/items/${musicId}`)
      if (!!result) {
        setLoved(true)
      } else setLoved(false)
      dispatch(loadItemsSuccess())
    }
    getData()
  }, [musicId])

  return <div onClick={handleLoveMusic}>{handleIcon()}</div>
}
