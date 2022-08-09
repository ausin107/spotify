import { startLoading, loadItemsSuccess, loadItemsFailed } from './collectionSlice'
import {
  addLikedMusic,
  getSingleLikedMusic,
  getAllLikedMusic,
  updateLikedMusic,
} from '../../lib/firebaseAction'
export const getCollection = (path) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const allMusics = await getAllLikedMusic(path)
    dispatch(loadItemsSuccess(allMusics))
  } catch (e) {
    dispatch(loadItemsFailed())
  }
}
export const addCollection = (path, data) => async (dispatch) => {
  dispatch(startLoading())
  try {
    alert('done')
    await addLikedMusic(path, data)
  } catch (e) {
    dispatch(loadItemsFailed())
  }
}
