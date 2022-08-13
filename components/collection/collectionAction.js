import { startLoading, loadItemsSuccess } from './collectionSlice'
import { setPlayList, setNotPlayList } from '../music_player/musicPlayerSlice'
import { addLikedMusic, getAllLikedMusic, removeLikedMusic, getSingleLikedMusic } from '../../lib/firebaseAction'
export const getCollection = (path) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const allMusics = await getAllLikedMusic(path)
    dispatch(loadItemsSuccess(allMusics))
  } catch (e) {
    dispatch(loadItemsSuccess())
  }
}
export const getSingleDoc = (path) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const result = await getSingleLikedMusic(path)
    dispatch(loadItemsSuccess())
    return result
  } catch (e) {
    dispatch(loadItemsSuccess())
  }
}
export const addCollection = (path, data) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await addLikedMusic(path, data)
    dispatch(loadItemsSuccess())
  } catch (e) {
    dispatch(loadItemsSuccess())
  }
}
export const deleteCollection = (path) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await removeLikedMusic(path)
    dispatch(loadItemsSuccess())
  } catch (e) {
    console.log(e)
    dispatch(loadItemsSuccess())
  }
}
