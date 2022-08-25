import { startLoading, loadItemsSuccess, endLoading } from './collectionSlice'
import { addFavoriteMusic, getAllFavoriteMusic, removeDocument } from '../../lib/firebaseAction'
import { setShow } from '../toast/toastSlice'
export const getCollection = (path, index) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const allMusics = await getAllFavoriteMusic(path)
    const result = {
      data: allMusics,
      index: index || 0,
    }
    dispatch(loadItemsSuccess(result))
    dispatch(endLoading())
  } catch (e) {
    dispatch(endLoading())
  }
}
export const addCollection = (path, data) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await addFavoriteMusic(path, data)
    dispatch(endLoading())
  } catch (e) {
    dispatch(endLoading())
  }
}
export const deleteCollection = (path, notify) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await removeDocument(path)
    dispatch(setShow(notify))
    dispatch(endLoading())
  } catch (e) {
    dispatch(endLoading())
  }
}
