import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
export async function getAllFavoriteMusic(pathName) {
  try {
    const docRef = collection(db, pathName)
    const docSnap = await getDocs(docRef)
    let data = []
    docSnap.forEach((doc) => {
      return data.push(doc.data())
    })
    return data
  } catch (e) {
    console.log(e)
  }
}
export async function getSingleFavoriteMusic(pathName) {
  try {
    const docRef = doc(db, pathName)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  } catch (e) {
    console.log(e)
  }
}
export async function addFavoriteMusic(pathName, data) {
  try {
    const subColRef = doc(db, pathName)
    await setDoc(subColRef, data)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
export async function updateFavoriteMusic(colName, docId, collectionId, updateData) {
  try {
    const collectionRef = doc(db, colName, docId, collectionId)
    await updateDoc(collectionRef, updateData)
  } catch (e) {
    console.log(e)
  }
}
export async function removeDocument(pathName) {
  try {
    const subColRef = doc(db, pathName)
    await deleteDoc(subColRef)
  } catch (e) {
    console.log(e)
  }
}
export async function addMusicToPlayList(pathName, data) {
  try {
    const collectionPath = collection(db, pathName)
    const docRef = await addDoc(collectionPath, data)
    return docRef.id
  } catch (e) {
    console.log(e)
  }
}
export async function getAllPlaylistsInfo(pathName) {
  try {
    const docRef = collection(db, pathName)
    const docSnap = await getDocs(docRef)
    let data = []
    let index = 0
    docSnap.forEach((doc) => {
      const result = doc.data()
      result.playListId = doc.id
      result.index = index
      index += 1
      data.push(result)
    })
    return data
  } catch (e) {
    console.log(e)
  }
}
export async function getAllPlaylistMusics(pathName) {
  try {
    const docRef = collection(db, pathName)
    const docSnap = await getDocs(docRef)
    let data = []
    docSnap.forEach((doc) => {
      return data.push(doc.data())
    })
    return data
  } catch (e) {
    console.log(e)
  }
}
export async function getSinglePlaylistsInfo(pathName) {
  try {
    const docRef = doc(db, pathName)
    const docSnap = await getDoc(docRef)
    let data = docSnap.data()
    return data
  } catch (e) {
    console.log(e)
  }
}
export async function updateSinglePlaylistsInfo(pathName, data) {
  try {
    const docRef = doc(db, pathName)
    await setDoc(docRef, data)
  } catch (e) {
    console.log(e)
  }
}
