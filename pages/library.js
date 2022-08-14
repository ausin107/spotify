import { useEffect, useState } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { getCollection } from '../components/collection/collectionAction'
import { useDispatch } from 'react-redux'
import {
  getAllFavoriteMusic,
  updateFavoriteMusic,
  addFavoriteMusic,
  getSingleFavoriteMusic,
} from '../lib/firebaseAction'
import { useSelector } from 'react-redux'
export default function Library() {
  const dispatch = useDispatch()
  const authKey = useSelector((state) => state.auth.authKey)
  const testData = {
    name: 'thanh xuan 111',
    id: 3333333,
  }
  return (
    <div className='left-[16.666%] w-[82vw] overflow-hidden h-full relative bg-bgColor pb-24'>
      <div
        className='bg-white p-2 rounded flex w-fit mt-20 ml-20 mr-5'
        onClick={() => addFavoriteMusic(`collection/${authKey}/items/musicCode`, testData)}>
        add
      </div>
      <div
        className='bg-white p-2 rounded flex w-fit mt-20 ml-20'
        onClick={() => getSingleFavoriteMusic(`collection/${authKey}/items/musicCode`)}>
        Get 1
      </div>
      <div
        className='bg-white p-2 rounded flex w-fit mt-20 ml-20'
        onClick={() => getAllFavoriteMusic(`collection/${authKey}/items`)}>
        Get
      </div>
    </div>
  )
}
