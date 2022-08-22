import { startLoading, loadItemsSuccess, endLoading } from './collectionSlice'
import { addFavoriteMusic, getAllFavoriteMusic, removeFavoriteMusic } from '../../lib/firebaseAction'
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
export const deleteCollection = (path) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await removeFavoriteMusic(path)
    dispatch(endLoading())
  } catch (e) {
    dispatch(endLoading())
  }
}
