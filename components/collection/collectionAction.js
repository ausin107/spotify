import { startLoading, loadItemsSuccess } from './collectionSlice'
import { addFavoriteMusic, getAllFavoriteMusic, removeFavoriteMusic } from '../../lib/firebaseAction'
export const getCollection = (path) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const allMusics = await getAllFavoriteMusic(path)
    dispatch(loadItemsSuccess(allMusics))
  } catch (e) {
    dispatch(loadItemsSuccess())
  }
}
export const addCollection = (path, data) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await addFavoriteMusic(path, data)
    dispatch(loadItemsSuccess())
  } catch (e) {
    dispatch(loadItemsSuccess())
  }
}
export const deleteCollection = (path) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await removeFavoriteMusic(path)
    dispatch(loadItemsSuccess())
  } catch (e) {
    console.log(e)
    dispatch(loadItemsSuccess())
  }
}
