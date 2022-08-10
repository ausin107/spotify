import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { getCollection } from '../components/collection/collectionAction'
export async function getAllLikedMusic(pathName) {
  try {
    const docRef = collection(db, pathName)
    const docSnap = await getDocs(docRef)
    return docSnap
    alert('fetch done')
  } catch (e) {
    console.log(e)
  }
}
export async function getListLikedMusic(pathName) {
  try {
  } catch (e) {}
}
export async function getSingleLikedMusic(pathName) {
  try {
    const docRef = doc(db, pathName)
    const docSnap = await getDoc(docRef)
    console.log(docSnap.data())
  } catch (e) {
    console.log(e)
  }
}
export async function addLikedMusic(pathName, data) {
  try {
    const subColRef = doc(db, pathName)
    const docRef = await setDoc(subColRef, data)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
export async function updateLikedMusic(colName, docId, collectionId, updateData) {
  try {
    const collectionRef = doc(db, colName, docId, collectionId)
    await updateDoc(collectionRef, updateData)
  } catch (e) {
    console.log(e)
  }
}
export async function removeLikedMusic(pathName) {
  try {
    const subColRef = doc(db, pathName)
    await deleteDoc(subColRef)
    alert('rm done')
  } catch (e) {
    console.log(e)
  }
}
